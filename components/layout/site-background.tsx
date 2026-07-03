export function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-background">
      <div className="site-background__grid" />
      <div className="site-background__beam site-background__beam--primary" />
      <div className="site-background__beam site-background__beam--accent" />
      <div className="site-background__noise" />
    </div>
  );
}
