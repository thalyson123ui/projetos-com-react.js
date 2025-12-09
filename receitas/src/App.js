import { useState } from 'react';
import './App.css';

function App() {
  const [receitas] = useState([
    {
      id: 1,
      nome: 'Bolo de Chocolate',
      imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      ingredientes: ['2 xícaras de farinha', '1 xícara de açúcar', '3 ovos', 'Chocolate em pó'],
      modo: 'Misture os ingredientes e asse a 180°C por 30 minutos.'
    },
    {
      id: 2,
      nome: 'Macarrão à Bolonhesa',
      imagem: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
      ingredientes: ['500g de macarrão', '400g de carne moída', 'Molho de tomate', 'Cebola e alho'],
      modo: 'Cozinhe a carne, adicione o molho e misture com o macarrão cozido.'
    },
    {
      id: 3,
      nome: 'Salada Verde',
      imagem: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
      ingredientes: ['Alface', 'Tomate', 'Cenoura', 'Azeite e limão'],
      modo: 'Lave as verduras, pique e tempere com azeite e limão a gosto.'
    },
    {
      id: 4,
      nome: 'Frango Grelhado',
      imagem: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
      ingredientes: ['800g de peito de frango', 'Limão', 'Alho', 'Tempero a gosto'],
      modo: 'Tempere o frango, grelhe em fogo médio por 15-20 minutos até cozinhar.'
    },
    {
      id: 5,
      nome: 'Sopa de Abóbora',
      imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
      ingredientes: ['1kg de abóbora', '1 litro de caldo de legumes', 'Cebola', 'Azeite e sal'],
      modo: 'Cozinhe a abóbora no caldo, bata e tempere conforme desejado.'
    },
    {
      id: 6,
      nome: 'Arroz com Feijão',
      imagem: 'https://uploads.metroimg.com/wp-content/uploads/2019/09/11161025/arroz-e-feij%C3%A3o.jpg',
      ingredientes: ['2 xícaras de arroz', '2 xícaras de feijão', 'Cebola', 'Alho'],
      modo: 'Refogue a cebola e alho, adicione o feijão e o arroz com água.'
    },
    {
      id: 7,
      nome: 'Pavê de Chocolate',
      imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2020/10/pave-brigadeiro-chocolate-amargo.jpg',
      ingredientes: ['Biscoito de chocolate', 'Leite condensado', 'Chocolate em pó', 'Calda de chocolate'],
      modo: 'Alterne camadas de biscoito molhado em leite com creme de chocolate.'
    },
    {
      id: 8,
      nome: 'Peixe ao Molho de Limão',
      imagem: 'https://d21wiczbqxib04.cloudfront.net/IPOKQricBdcdADXBqnont8CteXs=/0x600/smart/https://osuper-ecommerce-compre3letras.s3.sa-east-1.amazonaws.com/575b7263-f26a8836filedepeixegrelhadoaomolhodegorgonzola.jpeg',
      ingredientes: ['Filé de peixe', 'Limão', 'Manteiga', 'Sal e pimenta'],
      modo: 'Grelhe o peixe e regue com molho de manteiga e limão.'
    }
  ]);

  const [selecionada, setSelecionada] = useState(null);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <div className={`App ${modoEscuro ? 'escuro' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <h1>📖 Meu Livro de Receitas</h1>
          <button 
            className="btn-tema"
            onClick={() => setModoEscuro(!modoEscuro)}
            title={modoEscuro ? 'Modo claro' : 'Modo escuro'}
          >
            {modoEscuro ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="container">
        <aside className="lista-receitas">
          <h2>Receitas</h2>
          <ul>
            {receitas.map(receita => (
              <li key={receita.id}>
                <button 
                  onClick={() => setSelecionada(receita)}
                  className={selecionada?.id === receita.id ? 'ativa' : ''}
                >
                  <img src={receita.imagem} alt={receita.nome} />
                  <span>{receita.nome}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="detalhes-receita">
          {selecionada ? (
            <div>
              <img src={selecionada.imagem} alt={selecionada.nome} className="imagem-destaque" />
              <h2>{selecionada.nome}</h2>
              
              <section>
                <h3>📝 Ingredientes</h3>
                <ul>
                  {selecionada.ingredientes.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>👨‍🍳 Modo de Preparo</h3>
                <p>{selecionada.modo}</p>
              </section>
            </div>
          ) : (
            <p className="vazio">Selecione uma receita para começar</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;