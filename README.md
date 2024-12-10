# Explicação do Código React com React Query e Chakra UI

Este código exemplifica como usar o `React Query` para carregar dados de uma API e como criar novos dados usando uma mutação. Ele também utiliza o `Chakra UI` para estilização e o `axios` para realizar requisições HTTP. A seguir, explicamos cada parte do código para facilitar o entendimento.

## Objetivo do Código

O objetivo do código é criar uma página que interage com uma API externa (simulada por mock) para carregar e criar posts. Utiliza a biblioteca `React Query` para lidar com o carregamento de dados de forma eficiente e a biblioteca `Chakra UI` para estilização.

## Dependências Utilizadas

1. **`@tanstack/react-query`:** Biblioteca que facilita o gerenciamento do estado de dados em uma aplicação React, principalmente para requisições assíncronas.
2. **`@chakra-ui/react`:** Biblioteca de componentes prontos e personalizáveis para construir interfaces de usuário responsivas.
3. **`axios`:** Biblioteca para fazer requisições HTTP (GET, POST, etc.).
4. **`MockAdapter`:** Usado para simular respostas de uma API, sem precisar de um servidor real.
5. **`toaster`:** Um componente de UI personalizado para mostrar mensagens de sucesso ou erro ao usuário.

## Passo a Passo do Código

### 1. Configuração do Axios

```js
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
```

Criamos uma instância do `axios` com a URL base para onde todas as requisições serão enviadas.

### 2. Mock de API

```js
const mock = new MockAdapter(axiosInstance, { delayResponse: 3000 });

mock.onGet('/posts/1').reply(200, {
  title: 'Mocked Post Title',
});

mock.onPost('/posts').reply(201, {
  id: 101,
  title: 'New Mocked Post',
});
```

Usamos o `MockAdapter` para simular uma API que retorna posts. O método `onGet('/posts/1')` simula a resposta de uma requisição GET para o post com ID 1 e `onPost('/posts')` simula a criação de um novo post.

### 3. Funções Assíncronas para Buscar e Criar Posts

#### `fetchData`

```js
async function fetchData() {
  const res = await axiosInstance.get('/posts/1');
  return res.data;
}
```

Realiza uma requisição GET para a URL `/posts/1`, buscando os dados de um post específico.

#### `createPost`

```js
async function createPost(newPost: { title: string }) {
  const response = await axiosInstance.post('/posts', newPost);
  if (response.status !== 201) {
    throw new Error('Failed to create post');
  }
  return response.data;
}
```

Realiza uma requisição POST para criar um novo post. Se a resposta não for bem-sucedida (status diferente de 201), lança um erro.

### 4. Componente Principal (`Page`)

Dentro do componente `Page`, temos o seguinte fluxo:

#### Estados Locais

```js
const [title, setTitle] = useState('');
```

`title` armazena o título do novo post que o usuário deseja criar.

#### Hook `useQuery` para Buscar Dados

```js
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchData,
});
```

O hook `useQuery` é utilizado para buscar dados da API. Ele retorna três valores:

- `data`: Contém os dados retornados pela API (no caso, o título do post).
- `isLoading`: Indica se os dados estão sendo carregados.
- `error`: Indica se houve um erro durante a requisição.

#### Hook `useMutation` para Criar Dados

```js
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
```

`useMutation` é usado para operações de criação ou modificação de dados (como criar um post).

- O `onSuccess` é acionado quando a criação do post é bem-sucedida, exibindo uma mensagem de sucesso.
- O `onError` é acionado se ocorrer um erro, exibindo uma mensagem de erro.

#### Função `handleSubmit`

```js
const handleSubmit = () => {
  if (title.trim()) {
    mutate({ title });
    setTitle('');
  }
};
```

Esta função é chamada quando o usuário clica no botão para criar um novo post. Ela verifica se o título não está vazio e, em caso afirmativo, chama a função `mutate` para criar o post.

### 5. Renderização do Componente

#### Exibindo Dados Carregados

```js
if (isLoading) return <Spinner />;
if (error) return <Text>Error loading data</Text>;
```

Se os dados ainda estiverem sendo carregados, um spinner de carregamento será exibido. Se houver um erro, uma mensagem de erro será exibida.

#### Campos de Formulário para Criar Novo Post

```js
<Input
  placeholder="Post title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
<Button colorScheme="blue" onClick={handleSubmit}>
  Create Post
</Button>
```

Um campo de entrada (`Input`) permite que o usuário insira o título do novo post.
Um botão de criação (`Button`) chama a função `handleSubmit` ao ser clicado.

## Como executar

```bash
git clone https://github.com/pedrolucazx/hope-and-help.git && cd hope-and-help
npm install # ou yarn
npm run dev # ou yarn dev
```

## Controle de Qualidade de Código e Formatação de Commit

Em um fluxo de trabalho colaborativo, é essencial manter a qualidade e consistência do código, tanto no estilo quanto nas convenções de commits. Para isso, estamos utilizando uma série de ferramentas para automatizar a formatação de código e garantir que os commits sigam padrões específicos.

### Ferramentas Utilizadas

1. **Husky**: Uma ferramenta para configurar hooks no Git, garantindo que certas ações sejam realizadas antes ou depois de operações de Git, como `git commit` ou `git push`.
2. **Commitlint**: Uma ferramenta que valida se a mensagem de commit segue um padrão específico (normalmente o [Conventional Commits](https://www.conventionalcommits.org/)).
3. **Lint-staged**: Ferramenta que permite rodar linters e formatadores apenas nos arquivos que foram modificados (`staged`) antes de o commit ser realizado.
4. **Commitizen**: Uma ferramenta que ajuda a padronizar as mensagens de commit. Ele guia o desenvolvedor a escolher a opção correta para o tipo de commit, tornando os commits mais legíveis e organizados.

### Como Funciona o Processo de Commit

#### Passo 1: Realize as alterações no código

Primeiro, após fazer as alterações no seu código, você deve adicionar os arquivos que deseja commitá-los:

```bash
git add .
```

Isso adiciona todos os arquivos modificados ao **staging area**.

#### Passo 2: Realize o Commit com Commitizen

Para realizar o commit com o **Commitizen**, em vez de usar o comando tradicional `git commit`, utilizamos o seguinte comando:

```bash
yarn commit
# ou
npm run commit
```

Esse comando vai invocar o **Commitizen** e abrir uma interface interativa no terminal para guiar você a preencher a mensagem de commit.

#### Passo 3: Escolha a opção adequada no Commitizen

O **Commitizen** vai mostrar várias opções para escolher o tipo de commit. Aqui estão as opções que você verá e uma explicação de cada uma delas:

1. **feat**: Adição de uma nova funcionalidade. Use quando adicionar uma nova feature ao código.
   - Exemplo: `feat: add login functionality`
2. **fix**: Correção de um bug. Use quando corrigir um erro no código.
   - Exemplo: `fix: fix bug in user authentication`
3. **docs**: Alterações na documentação. Use quando você modifica ou adiciona documentação no código.
   - Exemplo: `docs: update README with new installation instructions`
4. **style**: Alterações de estilo no código que não afetam a lógica, como formatação de código, espaçamento, etc.
   - Exemplo: `style: format code with prettier`
5. **refactor**: Refatoração de código. Use quando alterar a estrutura do código sem alterar o comportamento, geralmente para melhorar a legibilidade ou desempenho.
   - Exemplo: `refactor: refactor login function to improve readability`
6. **perf**: Melhorias no desempenho. Use quando você faz modificações para melhorar o desempenho de uma funcionalidade ou parte do sistema.
   - Exemplo: `perf: optimize login API endpoint`
7. **test**: Adição ou modificação de testes. Use quando adicionar ou modificar testes no seu código.
   - Exemplo: `test: add unit tests for login function`
8. **chore**: Mudanças que não afetam o código em si, como atualizações de dependências ou alterações em arquivos de configuração.
   - Exemplo: `chore: update dependencies to latest version`
9. **ci**: Mudanças nos arquivos de configuração de integração contínua, como ajustes no pipeline do CI/CD.
   - Exemplo: `ci: add new build step in the CI configuration`
10. **build**: Alterações no processo de build, como ajustes nos scripts ou no empacotamento.
    - Exemplo: `build: add new webpack plugin for optimization`
11. **revert**: Reversão de um commit anterior. Use quando você precisar desfazer uma mudança feita por um commit anterior.
    - Exemplo: `revert: undo commit of feature X`

#### Passo 4: Confirme a Mensagem de Commit

Após escolher a opção, você precisará fornecer uma descrição mais detalhada, dependendo do tipo de commit. Por exemplo:

- Para um `feat`, você pode fornecer uma descrição mais detalhada sobre a funcionalidade que foi adicionada.
- Para um `fix`, você pode adicionar uma breve explicação sobre o erro que foi corrigido.

O **Commitizen** vai gerar automaticamente uma mensagem de commit formatada de acordo com o tipo escolhido. A mensagem resultante será algo como:

```bash
chore: set up React Query (TanStack), MockAdapter, Toaster, and Axios

```

#### Passo 5: Validação do Commit com Commitlint

Após a criação do commit, o **Husky** entra em ação e, antes de o commit ser realmente feito, o **Commitlint** verifica se a mensagem de commit segue o padrão estabelecido (por exemplo, **[Conventional Commits](https://www.conventionalcommits.org/))**. Se a mensagem de commit não seguir o padrão, o commit será rejeitado e você receberá uma mensagem de erro orientando sobre o que precisa ser corrigido.

#### Passo 6: Formatação do Código com Lint-staged

Antes de o commit ser finalizado, o **Lint-staged** é responsável por garantir que todos os arquivos staged (modificados) passem pelos linters e formatadores configurados. Isso garante que o código adicionado ao commit siga as regras de estilo (por exemplo, com o **Prettier** ou **ESLint**) e que o código esteja bem formatado.
Conclusão

## Conclusão

Este fluxo de trabalho visa garantir que o código seja limpo, bem documentado e que os commits sigam um padrão consistente, o que facilita tanto a revisão quanto a colaboração entre os desenvolvedores. Ferramentas como Husky, Commitlint, Lint-staged e Commitizen automatizam essas práticas, assegurando a manutenção da qualidade do código ao longo do desenvolvimento. O código exemplifica a utilização do React Query para carregar dados de uma API e criar novos dados por meio de mutações. Usando o Chakra UI, é construída uma interface simples e intuitiva para o usuário interagir com a aplicação, incluindo feedback visual (como mensagens de sucesso ou erro) através do componente toaster. Além disso, a simulação da API com o MockAdapter facilita o desenvolvimento e os testes, sem a necessidade de um backend real.
