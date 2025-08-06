<h1>📊 IMC Tracker - Guia de Configuração Inicial</h1>

<p>Seja bem-vindo ao <strong>IMC Tracker</strong>!<br>
Siga este passo a passo para rodar o projeto localmente, tanto o <strong>frontend</strong> quanto o <strong>backend</strong>.</p>

<hr>

<h2>🛠️ 1. Instalação de Dependências</h2>

<pre><code># Acesse a pasta do frontend
cd imc-tracker-frontend
npm install

# Acesse a pasta do backend
cd ../imc-tracker-backend
npm install
</code></pre>

<hr>

<h2>🔐 2. Configuração de Variáveis de Ambiente</h2>

<p>Crie um arquivo <code>.env</code> na raiz de <strong>cada projeto</strong> (<code>frontend</code> e <code>backend</code>) seguindo os arquivos de exemplos (.env.example) presentes tanto no front quanto no back:</p>

<ul>
  <li><code>imc-tracker-frontend/.env.example</code></li>
  <li><code>imc-tracker-backend/.env.example</code></li>
</ul>

<h3>⚠️ Importante:</h3>

<ul>
  <li>No <code>.env</code> do backend, defina o tempo de expiração do token JWT em segundos:<br>
    <pre><code>JWT_EXPIRES_IN="512s"</code></pre>
  </li>

  <li>Defina corretamente a variável <code>FRONT_URL</code> no backend com a URL onde o frontend será executado:<br>
    <pre><code>FRONT_URL=http://localhost:3000</code></pre>
  </li>

  <li>A variável <code>PORT</code> no backend deve <strong>corresponder</strong> à <code>API_URL</code> do frontend:<br>
    <pre><code># .env do backend
PORT=3001

# .env do frontend
API_URL=http://localhost:3001</code></pre>
  </li>
</ul>

<hr>

<h2>🧱 3. Preparação do Banco de Dados</h2>

<p>Execute as <strong>migrations</strong> para preparar o banco de dados:</p>

<pre><code>npm run migration:run</code></pre>

<p>Depois, rode a <strong>seed</strong> para criar o primeiro usuário administrador:</p>

<pre><code>npx ts-node src/database/seeds/create-user-admin.ts</code></pre>

<p>Se tudo estiver correto, você verá a mensagem:</p>

<pre><code>Usuário admin criado com sucesso!</code></pre>

<hr>

<h2>🚀 4. Inicializando os Projetos</h2>

<p>Execute ambos os projetos em modo de desenvolvimento:</p>

<pre><code># No frontend
npm run dev

# No backend
npm run dev</code></pre>

<hr>

<h2>🎉 5. Prontinho!</h2>

<p>Agora que tudo está configurado e rodando, você já pode acessar o sistema!<br>
Se você rodou a seed com sucesso, use as credenciais abaixo para fazer o login:</p>

<ul>
  <li><strong>Usuário:</strong> <code>admin@admin.com</code></li>
  <li><strong>Senha:</strong> <code>123123</code></li>
</ul>

<p>Depois de logado, aproveite os recursos do <strong>IMC Tracker</strong>! 😄</p>

<p>Abra o navegador e acesse o endereço informado no terminal pelo frontend 
(geralmente <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>).</p>

<p>Agora é só usar o IMC Tracker e ser feliz! 😄</p>
