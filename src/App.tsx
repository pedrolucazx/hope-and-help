import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toaster } from '@/components/ui/toaster'; // Verifique o caminho correto para o toaster

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const mock = new MockAdapter(axiosInstance, { delayResponse: 3000 });

mock.onGet('/posts/1').reply(200, {
  title: 'Mocked Post Title',
});

mock.onPost('/posts').reply(201, {
  id: 101,
  title: 'New Mocked Post',
});

async function fetchData() {
  const res = await axiosInstance.get('/posts/1');
  return res.data;
}

async function createPost(newPost: { title: string }) {
  const response = await axiosInstance.post('/posts', newPost);
  if (response.status !== 201) {
    throw new Error('Failed to create post');
  }
  return response.data;
}

export default function Page() {
  const [title, setTitle] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toaster.create({
        title: 'Post created.',
        type: 'success',
      });
    },
    onError: () => {
      toaster.create({
        title: 'Error creating post.',
        type: 'error',
      });
    },
  });

  if (isLoading) return <Spinner />;

  if (error) return <Text>Error loading data</Text>;

  const handleSubmit = () => {
    if (title.trim()) {
      mutate({ title });
      setTitle('');
    }
  };

  return (
    <>
      <Box p={4}>
        <Heading>Post Title:</Heading>
        <Text mt={2}>{data?.title}</Text>
      </Box>
      <Box p={4}>
        <Stack>
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create Post
          </Button>
        </Stack>
      </Box>
    </>
  );
}
