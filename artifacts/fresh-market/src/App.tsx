import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Leaf, MapPin, Menu, Search, Sprout, X } from 'lucide-react';

const queryClient = new QueryClient();

const departments = [
  { name: 'Fruits', count: '16 picks', color: '#dce8cf', mark: '01' },
  { name: 'Vegetables', count: '22 picks', color: '#d7e4cf', mark: '02' },
  { name: 'Bakery', count: '12 picks', color: '#f1d8b9', mark: '03' },
  { name: 'Dairy & eggs', count: '16 picks', color: '#e8e6d7', mark: '04' },
  { name: 'Meat & seafood', count: '10 picks', color: '#eed1c6', mark: '05' },
  { name: 'Pantry', count: '24 picks', color: '#eee2ac', mark: '06' },
  { name: 'Frozen', count: '9 picks', color: '#d5e5e7', mark: '07' },
  { name: 'Snacks & drinks', count: '25 picks', color: '#d9e3c8', mark: '08' },
];

const products = [
  { name: 'Sunrise heirloom tomatoes', detail: 'Grown nearby · Just picked', category: 'Vegetables', tone: 'tomato', tag: 'LOCAL FAVORITE', shape: 'tomato' },
  { name: 'Honeycrisp apples', detail: 'Crisp, sweet & orchard-fresh', category: 'Fruits', tone: 'apple', tag: 'IN SEASON', shape: 'apple' },
  { name: 'Orchard Bartlett pears', detail: 'Sweet, tender & grown nearby', category: 'Fruits', tone: 'pear', tag: 'IN SEASON', shape: 'pear' },
  { name: 'Sun-ripened strawberries', detail: 'Bright, juicy & picked this morning', category: 'Fruits', tone: 'berries', tag: 'FARM FRESH', shape: 'berries' },
  { name: 'Tender baby spinach', detail: 'Washed greens from local growers', category: 'Vegetables', tone: 'greens', tag: 'LOCAL FAVORITE', shape: 'greens' },
  { name: 'Sweet summer corn', detail: 'Golden ears, ready for the grill', category: 'Vegetables', tone: 'corn', tag: 'IN SEASON', shape: 'corn' },
  { name: 'Wildflower sourdough', detail: 'Slow-fermented · Baked at 6am', category: 'Bakery', tone: 'bread', tag: 'BAKED TODAY', shape: 'bread' },
  { name: 'Cream-top whole milk', detail: 'Glass-bottled · Meadowbrook Farm', category: 'Dairy & eggs', tone: 'milk', tag: 'LOCAL FAVORITE', shape: 'milk' },
  { name: 'Pasture-raised brown eggs', detail: 'Free-range · Dozen', category: 'Dairy & eggs', tone: 'eggs', tag: 'FARM FRESH', shape: 'eggs' },
  { name: 'Maple-glazed salmon', detail: 'Responsibly sourced · Atlantic', category: 'Meat & seafood', tone: 'salmon', tag: 'STAFF PICK', shape: 'salmon' },
  { name: 'Sunday tomato passata', detail: 'Small-batch · Made with love', category: 'Pantry', tone: 'jar', tag: 'PANTRY STAPLE', shape: 'jar' },
  { name: 'Garden herb dumplings', detail: 'Ready in minutes · 8 pieces', category: 'Frozen', tone: 'frozen', tag: 'NEW IN', shape: 'dumpling' },
  { name: 'Sea salt kettle chips', detail: 'Small batch · Extra crunchy', category: 'Snacks & drinks', tone: 'chips', tag: 'NEIGHBOR PICK', shape: 'chips' },
  { name: 'Ginger peach kombucha', detail: 'Bright, bubbly & brewed nearby', category: 'Snacks & drinks', tone: 'drink', tag: 'LOCAL FAVORITE', shape: 'drink' },
];

const deals = [
  { eyebrow: 'MARKET TABLE', title: 'Something good is in season.', body: 'The juiciest peaches, sweet corn and just-picked greens are having their moment. Come see what came in this morning.', color: 'peach', mark: '01' },
  { eyebrow: 'BAKERY WINDOW', title: 'A little something for the table.', body: 'Bring home our weekend sourdough, still warm from the oven, and a little jar of local honey to go with it.', color: 'bread', mark: '02' },
  { eyebrow: 'GOOD NEIGHBOR', title: 'A fresh start to the week.', body: 'Find a new favorite in every aisle. Our crew has gathered the small-batch things we can’t stop talking about.', color: 'green', mark: '03' },
];

function ProductArt({ item }: { item: (typeof products)[number] }) {
  return (
    <div className={`product-art art-${item.tone}`} aria-hidden="true">
      <span className="art-orbit" />
      <span className={`art-object object-${item.shape}`} />
      <span className="art-stem" />
      <span className="art-gleam" />
      <span className="art-index">FM / {item.category.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

function Home() {
  const [active, setActive] = useState('Everything');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProducts = useMemo(() => products.filter((item) => {
    const matchesCategory = active === 'Everything' || item.category === active;
    const matchesSearch = `${item.name} ${item.category} ${item.detail}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [active, search]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#f7f5ed] text-[#263c31]">
      <div className="topline">
        <span>YOUR NEIGHBORHOOD, WELL STOCKED</span><span className="topline-dot" />
        <span>Open today, 8am—8pm</span><a href="#visit" data-testid="link-store-hours">Come on in <ArrowUpRight size={12} /></a>
      </div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Fresh Market home" data-testid="link-home">
          <span className="brand-seal"><Sprout size={23} strokeWidth={1.7} /></span>
          <span className="brand-name">fresh<span>market</span><small>GOOD THINGS, CLOSE TO HOME</small></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <button onClick={() => goTo('departments')} data-testid="link-departments">Departments</button>
          <button onClick={() => goTo('market')} data-testid="link-market">In the market</button>
          <button onClick={() => goTo('deals')} data-testid="link-deals">This week’s finds <span className="nav-star">+</span></button>
          <button onClick={() => goTo('visit')} data-testid="link-visit">Our little corner</button>
        </nav>
        <button className="nav-visit" onClick={() => goTo('visit')} data-testid="button-find-us">Find us <ArrowUpRight size={15} /></button>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />A GOOD DAY STARTS HERE</p>
          <h1 className="font-display">A little fresher.<br /><em>A lot more local.</em></h1>
          <p className="hero-intro">The good stuff for your everyday. Picked close, made with care, and always worth the walk down the aisle.</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => goTo('departments')} data-testid="button-explore-aisles">Explore the aisles <ArrowRight size={16} /></button>
            <button className="text-link" onClick={() => goTo('deals')} data-testid="button-weekly-finds">See this week’s finds <span>↗</span></button>
          </div>
          <div className="hero-footnote"><span className="hero-spark">FM</span><span>GOOD PRODUCE, GOOD PEOPLE,<br />NO BIG-BOX FEELING.</span><span className="footnote-rule" /><span className="small-number">EST. 2012</span></div>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-photo"><img src="/market-hero.jpg" alt="Sunlit seasonal fruit and vegetables fresh from the market" /></div>
          <div className="photo-note"><span>THIS WEEK’S<br />MARKET TABLE</span><span className="photo-note-arrow">↗</span></div>
          <div className="hero-stamp"><span>GROWN WITH<br />GOOD INTENT</span><Leaf size={21} strokeWidth={1.3} /></div>
          <div className="hero-side-caption">FRESH FROM OUR FRIENDS AT THE FARM</div>
        </div>
        <div className="hero-scroll" onClick={() => goTo('departments')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && goTo('departments')} data-testid="button-scroll-departments"><span>TAKE A LOOK AROUND</span><ArrowDown size={14} /></div>
      </section>

      <section className="department-section" id="departments">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" />A STORE WITH A LITTLE OF EVERYTHING</p><h2 className="font-display">Find your <em>favorite aisle.</em></h2></div>
          <p className="section-aside">A good mix of everyday essentials<br />and the unexpected little things.</p>
        </div>
        <div className="department-grid">
          {departments.map((dep, index) => <button className={`department-tile tile-${index + 1}`} key={dep.name} onClick={() => { setActive(dep.name); goTo('market'); }} style={{ '--tile-color': dep.color } as CSSProperties} data-testid={`button-department-${dep.name.toLowerCase().replaceAll(' ', '-')}`}>
            <span className="tile-mark">{dep.mark}</span><span className={`tile-illustration illustration-${index + 1}`}><i /><b /></span>
            <span className="tile-label">{dep.name}</span><span className="tile-count">{dep.count}<ArrowUpRight size={14} /></span>
          </button>)}
        </div>
      </section>

      <section className="market-section" id="market">
        <div className="market-intro">
          <div><p className="eyebrow"><span className="eyebrow-line" />A FEW THINGS ON OUR SHELVES</p><h2 className="font-display">Good things, <em>right now.</em></h2></div>
          <div className="market-intro-right"><p>Meet a few favorites from around the store. The shelves are always changing, so there’s usually something new to discover.</p><div className="search-box"><Search size={16} /><input aria-label="Search what is in stock" placeholder="Find something good…" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-products" /><kbd>↵</kbd></div></div>
        </div>
        <div className="filter-row" role="group" aria-label="Filter products by department">
          {['Everything', ...departments.map((item) => item.name)].map((category) => <button key={category} className={`filter-chip ${active === category ? 'selected' : ''}`} onClick={() => setActive(category)} data-testid={`filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
          <span className="stock-note"><span /> IN THE STORE TODAY</span>
        </div>
        {visibleProducts.length > 0 ? <div className="product-grid">
          {visibleProducts.map((item, index) => <article className="product-card" key={item.name} style={{ animationDelay: `${index * 55}ms` }} data-testid={`card-product-${item.name.toLowerCase().replaceAll(' ', '-')}`}>
            <div className="product-visual-wrap"><ProductArt item={item} /><span className="product-tag">{item.tag}</span><span className="product-arrow"><ArrowUpRight size={16} /></span></div>
            <div className="product-info"><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>{item.detail}</p></div>
          </article>)}
        </div> : <div className="empty-state"><span className="empty-mark">FM</span><h3 className="font-display">Nothing on this shelf yet.</h3><p>Try another search or browse the full market.</p><button className="text-link" onClick={() => { setSearch(''); setActive('Everything'); }} data-testid="button-reset-search">Show everything <ArrowRight size={15} /></button></div>}
        <div className="market-endnote"><span>THERE’S MORE IN STORE</span><span className="endnote-line" /><span>Come by and see what’s fresh off the truck.</span></div>
      </section>

      <section className="deals-section" id="deals">
        <div className="deals-head">
          <div><p className="eyebrow light"><span className="eyebrow-line" />THE GOOD STUFF, THIS WEEK</p><h2 className="font-display">This week’s deals.<br /><em>Little surprises.</em></h2></div>
          <div className="deal-head-aside"><p>New week, new reasons to pop in. Here’s what our crew is excited about right now.</p><span className="deal-date"><span className="date-dot" /> CURRENT WEEK <span className="date-rule" /> WHILE IT LASTS</span></div>
        </div>
        <div className="deal-cards">
          {deals.map((deal) => <article className={`deal-card deal-${deal.color}`} key={deal.title} data-testid={`card-weekly-find-${deal.mark}`}>
            <span className="deal-index">FRESH FINDS <b>{deal.mark}</b></span><span className="deal-pattern" aria-hidden="true"><i /><b /></span>
            <div className="deal-copy"><span className="deal-eyebrow">{deal.eyebrow}</span><h3 className="font-display">{deal.title}</h3><p>{deal.body}</p><button onClick={() => goTo('market')} className="deal-link" data-testid={`button-find-${deal.mark}`}>Find it in store <ArrowUpRight size={15} /></button></div>
          </article>)}
        </div>
        <p className="deal-disclaimer">Our weekly finds are here for browsing inspiration. Selection may vary by day and season.</p>
      </section>

      <section className="local-section">
        <div className="local-visual"><div className="local-photo"><img src="/market-hero.jpg" alt="A colorful crate of produce ready for the neighborhood" /></div><span className="local-photo-caption">A LITTLE BIT OF THE NEIGHBORHOOD<br />IN EVERY AISLE</span><span className="local-roundel">GOOD<br />FOOD<br /><b>GROWS</b><br />HERE</span></div>
        <div className="local-copy"><p className="eyebrow"><span className="eyebrow-line" />YOUR CORNER STORE, IN SPIRIT</p><h2 className="font-display">We know a thing<br />or two about <em>good<br />neighbors.</em></h2><p className="local-body">We’re a small store with a big soft spot for the people and makers around us. From the farm down the road to the bread baked before sunrise, we bring a little of our neighborhood to your table.</p><div className="local-signature"><span className="signature-rule" /><span>Come as you are. Stay for a minute.</span></div><button className="button-primary" onClick={() => goTo('visit')} data-testid="button-about-store">A little more about us <ArrowRight size={16} /></button></div>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-top"><p className="eyebrow light"><span className="eyebrow-line" />WE’RE RIGHT AROUND THE CORNER</p><span className="visit-flower">F</span></div>
        <div className="visit-content"><div><h2 className="font-display">Drop by.<br /><em>We’ll be here.</em></h2><p>Good things are even better in person.</p></div><div className="visit-details"><div className="visit-detail"><MapPin size={18} /><div><span>FIND OUR FRONT DOOR</span><strong>48 Orchard Lane, Maplewood</strong><small>Just off the little main street</small></div></div><div className="visit-detail"><Clock3 size={18} /><div><span>COME ON IN</span><strong>Every day, 8am—8pm</strong><small>We’re here when you need a little something</small></div></div><a className="visit-map" href="https://maps.google.com/?q=48+Orchard+Lane+Maplewood" target="_blank" rel="noreferrer" data-testid="link-open-map">Get directions <ArrowUpRight size={16} /></a></div></div>
        <div className="visit-bottom"><span>FRESH MARKET <b>·</b> MAPLEWOOD, EST. 2012</span><span>GOOD THINGS, CLOSE TO HOME.</span><span>MON—SUN <b>·</b> 8AM—8PM</span></div>
      </section>
      <footer className="footer"><a href="#home" className="footer-brand" data-testid="link-back-top">freshmarket <Sprout size={15} /></a><span>Made with care, for our neighbors.</span><button onClick={() => goTo('home')} data-testid="button-back-top">Back to the top ↑</button></footer>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
