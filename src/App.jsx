import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { menuItemsData } from './components/common/Menu/data';
import './App.css';

const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const products = menuItemsData.map(p => ({ ...p, category: p.id < 5 ? 'coxinhas' : 'bebidas', img: p.id === 5 ? '/images/cola.svg' : p.id === 6 ? '/images/guarana.svg' : p.img }));
const descriptions = ['Frango desfiado, tempero caseiro e aquela casquinha que faz croc.', 'Carne seca bem temperada. Um recheio cheio de personalidade.', 'Queijo derretido e presunto: uma dupla que sempre dá certo.', 'Frango desfiado com um toque extra de cremosidade.', 'Coca-Cola em lata, 350 ml.', 'Guaraná em lata, 350 ml.'];
function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('select-cart'));
    return Object.fromEntries(products.map(p => [p.id, Math.min(99, Math.max(0, Math.floor(Number(saved?.[p.id] ?? localStorage.getItem(`quantidade_${p.id}`)) || 0)))]));
  } catch { return {}; }
}
function Mark() { return <svg viewBox="0 0 48 58" aria-hidden="true"><path d="M24 3C21 15 5 28 5 38a19 19 0 0 0 38 0C43 28 27 15 24 3Z" fill="currentColor"/><path d="M17 29c-6 7-6 14 0 18" fill="none" stroke="var(--yellow)" strokeWidth="4" strokeLinecap="round"/></svg>; }
function Brand() { return <Link className="brand" to="/" aria-label="Coxinhas Select, início"><Mark/><span>coxinhas<strong>select</strong></span></Link>; }
function Bag() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>; }
function Quantity({ product, cart, change }) { const n = cart[product.id] || 0; return <div className="quantity"><button aria-label={`Remover uma unidade de ${product.name}`} onClick={() => change(product.id, -1)} disabled={!n}>−</button><span aria-live="polite">{n}</span><button aria-label={`Adicionar uma unidade de ${product.name}`} disabled={n >= 99} onClick={() => change(product.id, 1)}>+</button></div>; }
function Shop({ cart, change, total, count }) {
  const [filter, setFilter] = useState('coxinhas');
  return <>
    <section className="hero campaign-hero" aria-labelledby="hero-title">
      <div className="hero-stage wrap">
        <span className="hero-kicker eyebrow">COXINHA BOA DÁ PARA SENTIR DAQUI.</span>
        <h1 id="hero-title"><span>AMOR À</span><span>PRIMEIRA</span><span>MORDIDA</span></h1>
        <img className="campaign-person" src="/images/campaign-person-v2.webp" alt="Imagem de campanha: mulher saboreando uma coxinha e segurando uma bandeja de salgados" fetchpriority="high"/>
        <div className="hero-note"><h2>Seu dia pede<br/> essa pausa.</h2><p>Casquinha crocante, recheio generoso<br/>e vontade de pedir mais uma.</p><a className="button" href="#cardapio">Quero escolher a minha</a></div>
        <img className="hero-floating-food" src="/images/coxinha-single.webp" alt=""/>
        <div className="hero-price"><span>O clássico que conquista</span><strong>Frango</strong><div><small>a partir de</small><b>{money(3.5)}</b></div></div>
        <span className="hero-side-note">FEITA À MÃO.<br/>AMADA DE VERDADE.</span>
      </div>
    </section>
    <section className="menu-section wrap" id="cardapio"><div className="menu-heading"><span className="eyebrow">TEM UM SABOR COM A SUA CARA</span><h2>QUAL VAI GANHAR<br/>A SUA PRIMEIRA MORDIDA?</h2><p>Escolha o recheio. Capriche na quantidade. Aproveite a pausa.</p></div><div className="filters" aria-label="Categorias do cardápio">{[['coxinhas','Coxinhas','/images/coxinha-single.webp'],['bebidas','Bebidas','/images/cola.svg'],['todos','Quero tudo','/images/coxinhas-hero.webp']].map(([id,label,img]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)} className={filter === id ? 'active' : ''}><img src={img} alt=""/><span>{label}</span></button>)}</div>
      <div className={`product-grid filter-${filter}`}>{products.filter(p => filter === 'todos' || p.category === filter).map(p => <article className={`product product-${p.id}`} key={p.id}><div className="product-copy"><span className="product-tag">{p.id === 1 ? 'O CLÁSSICO' : p.id === 4 ? 'EXTRA CREMOSIDADE' : p.category === 'bebidas' ? 'PARA ACOMPANHAR' : 'SEU NOVO FAVORITO'}</span><h3>{p.name.replace('Coxinha de ', '').replace(/^queijo/, 'Queijo')}</h3><p>{descriptions[p.id-1]}</p></div><img className="product-photo" loading="lazy" src={p.category === 'bebidas' ? p.img : p.id === 1 || p.id === 4 ? '/images/coxinhas-hero.webp' : p.id === 3 ? '/images/coxinha-presunto-v2.webp' : '/images/coxinha-single.webp'} alt={p.category === 'bebidas' ? 'Imagem ilustrativa de bebida em lata' : 'Imagem ilustrativa de coxinha'}/><div className="product-buy"><strong>{money(p.price)}<small>/ unidade</small></strong><Quantity product={p} cart={cart} change={change}/></div></article>)}</div><p className="image-caption">Imagens ilustrativas dos produtos.</p>
    </section>
    <section className="recheio-section" id="sobre">
      <div className="recheio-photo"><img src="/images/campaign-recheio-v2.webp" alt="Coxinha aberta com recheio de frango e queijo cremoso em destaque" loading="lazy"/></div>
      <div className="recheio-content wrap"><div className="recheio-copy"><span className="eyebrow">PODE OLHAR BEM DE PERTO</span><h2>O RECHEIO<br/>FALA POR SI.</h2><p>Uma casquinha dourada que faz croc.<br/>Um recheio que não economiza no sabor.<br/>É assim que a gente gosta de fazer.</p><a href="#cardapio" className="button button-yellow">Encontrar meu favorito</a></div></div>
    </section>
    <section className="pause-section wrap"><div className="pause-heading"><span className="eyebrow">DA NOSSA COZINHA PARA O SEU DIA</span><h2>A pausa é pequena.<br/><em>O capricho, não.</em></h2></div><div className="pause-content"><p>Cada coxinha é feita à mão, com massa bem preparada e recheio de verdade. Para acompanhar aquela conversa boa, o intervalo da tarde ou a vontade que apareceu agora.</p><div className="pause-details"><span>Massa feita com cuidado</span><span>Recheio bem temperado</span><span>Crocância em cada mordida</span></div></div></section>
    <section className="closing"><div className="wrap closing-inner"><img className="closing-food" src="/images/coxinhas-hero.webp" alt="" loading="lazy"/><div className="closing-copy"><span className="eyebrow">É DIFÍCIL FICAR SÓ NA VONTADE</span><h2>BATEU A FOME?<br/>VEM DE COXINHA.</h2><p>Um clássico, um cremoso ou um de cada.<br/>A sua sacola merece essa felicidade.</p><a className="button" href="#cardapio">Montar meu pedido</a></div><img className="closing-single" src="/images/coxinha-single.webp" alt="" loading="lazy"/></div></section>
    {count > 0 && <div className="cart-bar"><span><Bag/><b>{count} {count === 1 ? 'item' : 'itens'}</b><span className="cart-bar-message">Uma boa escolha!</span></span><Link to="/carrinho">Ver meu pedido <strong>{money(total)}</strong></Link></div>}
  </>;
}
function Cart({ cart, change, total, finish }) { const selected=products.filter(p => cart[p.id] > 0); return <main className="cart-page wrap"><span className="eyebrow">QUASE NA HORA DA PRIMEIRA MORDIDA</span><h1>Seu pedido.</h1>{!selected.length ? <div className="empty-cart"><Mark/><h2>Sua sacola está esperando um sabor.</h2><Link className="button" to="/#cardapio">Escolher coxinhas</Link></div> : <div className="cart-layout"><div className="cart-items">{selected.map(p => <article className="cart-row" key={p.id}><img src={p.category === 'bebidas' ? p.img : '/images/coxinhas-hero.webp'} alt=""/><div><h2>{p.name}</h2><p>{money(p.price)} por unidade</p><button className="remove" onClick={() => change(p.id, -cart[p.id])}>Remover</button></div><Quantity product={p} cart={cart} change={change}/><strong>{money(p.price * cart[p.id])}</strong></article>)}<Link className="text-link" to="/#cardapio">Continuar escolhendo</Link></div><aside className="order-summary"><h2>Resumo do pedido</h2><p><span>Subtotal</span><strong>{money(total)}</strong></p><p><span>Total dos produtos</span><strong>{money(total)}</strong></p><small>Este é um projeto demonstrativo. A finalização simula um pedido, sem pagamento ou entrega.</small><button className="button" onClick={finish}>Finalizar pedido demonstrativo</button></aside></div>}</main>; }
function Layout() {
  const [cart, setCart] = useState(readCart); const [lastOrder,setLastOrder] = useState(null); const [notice,setNotice] = useState('');
  const location = useLocation(); const navigate = useNavigate();
  useEffect(() => { try { localStorage.setItem('select-cart', JSON.stringify(cart)); } catch { setNotice('Não foi possível salvar sua sacola neste navegador.'); } }, [cart]);
  useEffect(() => { if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView()); else window.scrollTo(0,0); }, [location]);
  const count=products.reduce((n,p) => n+(cart[p.id]||0),0); const total=products.reduce((n,p) => n+(cart[p.id]||0)*p.price,0);
  const change=(id,delta) => { setCart(c => ({...c,[id]:Math.min(99,Math.max(0,(c[id]||0)+delta))})); setNotice(delta > 0 ? 'Produto adicionado à sacola.' : 'Sacola atualizada.'); };
  const finish=() => { setLastOrder({count,total}); setCart({}); products.forEach(p => { try { localStorage.removeItem(`quantidade_${p.id}`); } catch {} }); navigate('/finalizar'); };
  return <><header className="site-header wrap"><Brand/><nav aria-label="Navegação principal"><Link to="/#cardapio">Cardápio</Link><Link to="/#sobre">Nossa cozinha</Link></nav><Link className="bag-link" to="/carrinho" aria-label={`Minha sacola, ${count} ${count === 1 ? 'item' : 'itens'}`}><Bag/><span>Minha sacola</span><b>{count}</b></Link></header><div role="status" className="sr-only">{notice}</div><Routes><Route path="/" element={<main><Shop {...{cart,change,total,count}}/></main>}/><Route path="/carrinho" element={<Cart {...{cart,change,total,finish}}/>}/><Route path="/finalizar" element={<main className="success wrap"><Mark/><span className="eyebrow">{lastOrder ? 'SIMULAÇÃO CONCLUÍDA' : 'COXINHAS SELECT'}</span><h1>{lastOrder ? 'Deu tudo certo!' : 'Vamos escolher seu sabor?'}</h1><p>{lastOrder ? `${lastOrder.count} ${lastOrder.count === 1 ? 'item' : 'itens'} • ${money(lastOrder.total)}. Seu pedido demonstrativo foi finalizado.` : 'Seu próximo pedido começa pelo cardápio.'}</p>{lastOrder && <p>Nenhuma cobrança ou entrega foi realizada.</p>}<Link className="button" to="/">Voltar ao início</Link></main>}/><Route path="*" element={<main className="success wrap"><h1>Página não encontrada.</h1><Link className="button" to="/">Voltar ao cardápio</Link></main>}/></Routes><footer className="site-footer wrap"><Brand/><p>Feitas à mão, para deixar o dia mais gostoso.</p><Link to="/#cardapio">Explorar o cardápio</Link><small>Projeto demonstrativo · Coxinhas Select</small></footer></>;
}
export default function App() { return <BrowserRouter><Layout/></BrowserRouter>; }
