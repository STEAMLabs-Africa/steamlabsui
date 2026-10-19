// The STEAMLabs UI logo: the Rooms screen and stand with a paintbrush on it.
// Plain SVG markup so the docs can render it before any script runs. The ink
// follows the docs theme; the brand colours stay fixed.

const clover = "#3E9E49";
const fuel = "#F0A924";
const pacific = "#00A1B6";
const jazzberry = "#A01F60";
const ink = "var(--doc-fg)";

export function uiLogoSvg({ animate = false, id }: { animate?: boolean; id?: string } = {}) {
  const d = (ms: number) => `style="--d:${ms}ms"`;
  return `<svg class="ui-logo"${id ? ` id="${id}"` : ""} viewBox="0 0 236 56" role="img" aria-label="STEAMLabs UI" data-animate="${animate}" xmlns="http://www.w3.org/2000/svg">
<title>STEAMLabs UI</title>
<path data-draw pathLength="1" ${d(0)} d="M12 8h30a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="none" stroke="${clover}" stroke-width="3.2" stroke-linejoin="round"/>
<path data-draw pathLength="1" ${d(260)} d="M16 50h22" fill="none" stroke="${fuel}" stroke-width="3.2" stroke-linecap="round"/>
<path data-draw pathLength="1" ${d(480)} d="M40 13L29.5 23.5" fill="none" stroke="${jazzberry}" stroke-width="4.4" stroke-linecap="round"/>
<path data-draw pathLength="1" ${d(600)} d="M29.5 23.5L25.8 27.2" fill="none" stroke="${pacific}" stroke-width="5.6"/>
<path data-pop ${d(720)} d="M23.8 25.2L27.8 29.2Q25.6 35.4 16.6 36.6Q17.6 27.6 23.8 25.2Z" fill="${fuel}"/>
<path data-draw pathLength="1" ${d(900)} d="M23 39.5c3-1.4 5.5-1.4 8 0s5 1.4 8 0" fill="none" stroke="${fuel}" stroke-width="2.8" stroke-linecap="round"/>
<text x="62" y="37" font-family="Poppins, system-ui, sans-serif" font-size="25" letter-spacing="-0.5"><tspan data-fade ${d(700)} font-weight="800" fill="${ink}">STEAM</tspan><tspan data-fade ${d(820)} font-weight="800" fill="${clover}">Labs</tspan><tspan data-fade ${d(960)} font-weight="500" fill="${ink}" dx="6">UI</tspan></text>
</svg>`;
}
