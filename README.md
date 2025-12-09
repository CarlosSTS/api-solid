# Configuração do Projeto

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