Estrutura esperada pelo código (nomes exatos):

public/images/
├── og-cover.jpg              (1200x630 — compartilhamento em redes sociais)
├── photos/
│   ├── hero-portrait.jpg     (retrato — usado na Home)
│   ├── about-consultorio.jpg (foto do consultório — Home)
│   └── sobre-retrato.jpg     (retrato — página /sobre)
├── before-after/
│   ├── 1-antes.jpg  1-depois.jpg
│   ├── 2-antes.jpg  2-depois.jpg
│   ├── 3-antes.jpg  3-depois.jpg
│   └── 4-antes.jpg  4-depois.jpg
├── blog/
│   ├── harmonizacao-orofacial.jpg
│   ├── mitos-botox.jpg
│   └── primeira-avaliacao.jpg
└── gallery/
    ├── 1.jpg  2.jpg  3.jpg  4.jpg  5.jpg   (seção "Bastidores" da Home)

Favicon e ícones do manifest (favicon.ico, apple-touch-icon.png,
icon-192.png, icon-512.png) vão na RAIZ de /public (fora de /images).

Basta salvar os arquivos com esses nomes exatos — o código já está
referenciando esses caminhos, nenhuma alteração extra é necessária.
