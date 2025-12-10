# Configuração do Projeto

## Dependências

```bash
npm i typescript @types/node tsx tsup -D
```

```bash
npm i fastify
```

```bash
npm i dotenv
```

```bash
npm i zod
```

```bash
npm i eslint -D
```

```bash
npm i eslint-config-prettier -D
```

```bash
npm i eslint-plugin-prettier -D
```

```bash
npm i typescript-eslint -D
```

```bash
npm i prisma -D
```

```bash
npm i @prisma/client
```

```bash
npm npm i @types/pg -D
npm i @prisma/adapter-pg # Nova arquitetura do prisma 7
```

```bash
npm i bcryptjs
```

```bash
npm i @types/bcryptjs -D
```

```bash
npm i vitest vite-tsconfig-paths -D
```

```bash
npm i @vitest/coverage-v8 -D
```

```bash
npm i -D @vitest/ui
```

## Alteração necessária no `package.json`

Para executar o projeto com TypeScript diretamente, altere a seguinte linha no arquivo `package.json`:

**De:**

```json
"type": "commonjs"
```

**Para:**

```json
"type": "module"
```

Esta configuração habilita o suporte a **ES Modules**, permitindo que o TypeScript seja executado diretamente no projeto sem necessidade de transpilação prévia.

## Configuração do `tsconfig.json`

> **Nota:** Caso o arquivo `tsconfig.json` não exista no projeto, crie-o executando:

> ```bash
> npx tsc --init
> ```

Após criar ou localizar o arquivo `tsconfig.json`, modifique as seguintes propriedades:

**De:**

```json
"module": "nodenext"
```

**Para:**

```json
"module": "esnext",
"moduleResolution": "bundler",
"target": "ES2022"
```

**Benefícios:**

- Permite importar arquivos TypeScript sem especificar extensões `.ts` ou `.js`
- `target: ES2022` gera código moderno com boa compatibilidade (Node.js 18+), suportando recursos como top-level await e private fields

### Configurando Path Aliases

Para facilitar os imports e evitar caminhos relativos longos como `../../../`, adicione as seguintes propriedades no `tsconfig.json`:

```json
"baseUrl": "./",
"paths": {
  "@/*": ["./src/*"]
}
```

**Benefício:** Torna os imports mais limpos, legíveis e fáceis de manter, independente da profundidade do arquivo.

## Configuração do Prisma

### Inicializar o Prisma

```bash
npx prisma init
```

Este comando cria a estrutura inicial do Prisma no projeto:

- Pasta `prisma/` com o arquivo `schema.prisma`
- Arquivo `.env` com a variável `DATABASE_URL`

### Gerar tipagens do Prisma Client

```bash
npx prisma generate
```

**O que faz:** Cria automaticamente as tipagens TypeScript baseadas no seu `schema.prisma`, gerando o Prisma Client com auto-complete e type-safety para todas as suas models.

**Quando usar:** Execute este comando sempre que modificar o `schema.prisma` para atualizar as tipagens.

### Criar e aplicar migrations

```bash
npx prisma migrate dev
```

**O que faz:**

- Cria uma nova migration baseada nas alterações do `schema.prisma`
- Aplica a migration no banco de dados de desenvolvimento
- Gera automaticamente o Prisma Client atualizado

**Quando usar:** Execute este comando sempre que modificar o `schema.prisma` (adicionar, alterar ou remover models/campos) para sincronizar as alterações com o banco de dados.

**Observação:** Este comando solicita um nome descritivo para a migration (ex: `create_users_table`, `add_email_to_users`).

### Visualizar e editar dados com Prisma Studio

```bash
npx prisma studio
```

**O que faz:**

- Abre uma interface visual no navegador (geralmente em `http://localhost:5555`)
- Permite visualizar, criar, editar e deletar registros do banco de dados
- Oferece uma forma intuitiva de gerenciar dados sem escrever SQL

**Quando usar:**

- Para visualizar rapidamente os dados durante o desenvolvimento
- Para testar e validar operações no banco
- Para fazer ajustes manuais nos dados sem precisar de queries SQL

## Estrutura do Projeto

### Arquitetura de Camadas

O projeto segue os princípios SOLID e uma arquitetura em camadas bem definida:

```
HTTP Layer (Rotas e Controllers)
         ↓
Use Cases (Regras de Negócio)
         ↓
Repositories (Abstração de Dados)
         ↓
Database (Prisma ORM)
```

### Fluxo de Comunicação dos Endpoints

#### 1. **Rotas** (`src/http/routes.ts`)

Define os endpoints disponíveis na API:

```typescript
app.post('/users', register)
```

#### 2. **Controllers** (`src/http/controllers/`)

Recebem as requisições HTTP, validam os dados e coordenam a execução:

```typescript
// register.ts
- Valida o body da requisição com Zod
- Instancia o Repository
- Instancia o Use Case
- Executa a lógica de negócio
- Trata erros e retorna a resposta HTTP
```

#### 3. **Use Cases** (`src/use-cases/`)

Contêm a lógica de negócio da aplicação:

```typescript
// register.ts
- Recebe os dados validados
- Aplica regras de negócio (ex: verificar email duplicado)
- Executa operações através do Repository
- Retorna o resultado
```

#### 4. **Repositories** (`src/repositories/`)

Abstraem o acesso aos dados:

```typescript
// users-repository.ts (Interface)
- Define o contrato dos métodos de acesso a dados

// prisma-users-repository.ts (Implementação)
- Implementa os métodos usando Prisma ORM
- Executa queries no banco de dados
```

### Exemplo Prático: Endpoint `POST /users`

```
Cliente HTTP
    ↓
[POST /users] → routes.ts
    ↓
register() → controllers/register.ts
    ↓ (valida dados com Zod)
    ↓ (instancia PrismaUsersRepository)
    ↓ (instancia RegisterUseCase)
    ↓
RegisterUseCase.execute()
    ↓ (verifica email duplicado)
    ↓ (hash da senha)
    ↓
usersRepository.create()
    ↓
Prisma ORM → Database
    ↓
Response HTTP 201 Created
```

### Benefícios desta Arquitetura

- **Separação de Responsabilidades**: Cada camada tem uma função específica
- **Testabilidade**: Use Cases podem ser testados isoladamente
- **Manutenibilidade**: Mudanças em uma camada não afetam as outras
- **Dependency Inversion**: Use Cases dependem de abstrações (interfaces), não de implementações concretas
- **Reusabilidade**: Use Cases podem ser utilizados por diferentes controllers
