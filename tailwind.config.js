module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'pingslow': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      colors: {
        bgprimary: 'rgb(255,255,252)',
        bgsecondary: 'rgb(248,248,245)',
        textprimary: '#05050c',
        textaccent: '#2b6cb0',
        accent1: 'rgb(90, 229, 103)',
        accent2: 'rgb(68, 190, 212)',
        accent3: 'rgb(166, 101, 250)',

        darkbgprimary: 'rgb(15,23,35)',
        darkbgsecondary: 'rgb(13,19,32)',
        darktextprimary: '#F5F5E6',
        darktextaccent: '#81e6d9',
        darkaccent1: 'rgb(54, 139, 62)',
        darkaccent2: 'rgb(41, 115, 128)',
        darkaccent3: 'rgb(100, 61, 151)',
      },
      backgroundImage: {
        'backgroundimagepage': 'url("./images/backgroundoverlaycolors.png")',
        'radialgs': 'radial-gradient(circle, rgba(78,156,71,1) 0%, rgba(78,156,71,1) 35%, rgba(90,229,103,0) 95%);',
        'radialrg': 'radial-gradient(circle, rgba(179,113,222,1) 0%, rgba(179,113,222,1) 35%, rgba(179,113,222,0) 95%);',
        'radialcs': 'radial-gradient(circle, rgba(62,40,144,1) 0%, rgba(62,40,144,1) 35%, rgba(62,40,144,0) 95%);',
        'radialcj': 'radial-gradient(circle, rgba(65,64,66,1) 0%, rgba(65,64,66,1) 35%, rgba(65,64,66,0) 95%);',
      }
    }
  },
  plugins: [],
}
