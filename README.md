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

