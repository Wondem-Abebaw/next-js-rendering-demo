# Next.js Rendering Techniques Demo

A comprehensive educational Next.js app demonstrating different rendering strategies with real API data. This project shows SSR, SSG, ISR, CSR, Edge Runtime, and Server vs Client Components side-by-side.

## Features

- **6 Different Rendering Routes**: Each demonstrating a distinct rendering pattern
- **Real API Integration**: Uses [World Time API](https://worldtimeapi.org) for live data
- **Educational Explanations**: Each page explains how rendering works and when to use it
- **Pros/Cons Comparison**: Home page shows advantages and disadvantages of each method
- **Visual Data Displays**: Clear cards showing API data, timestamps, and freshness indicators

## Rendering Techniques Covered

### 1. **SSR - Server-Side Rendering** (`/ssr`)
- Renders on the server for **every request**
- Always fresh data, but slower response times
- Use when: Content changes frequently, need SEO with dynamic data

### 2. **SSG - Static Site Generation** (`/ssg`)
- Generated at **build time** and cached
- Extremely fast, but data is static until rebuild
- Use when: Content rarely changes (blogs, docs, marketing sites)

### 3. **ISR - Incremental Static Regeneration** (`/isr`)
- Static like SSG, but **regenerates periodically in background**
- Combines SSG speed with fresher data
- Use when: Need balance between performance and freshness

### 4. **CSR - Client-Side Rendering** (`/csr`)
- Renders in the **browser using JavaScript**
- Real-time interactive updates, slower initial load
- Use when: Building interactive apps, need real-time updates

### 5. **Edge Runtime** (`/edge`)
- Runs on **Vercel Edge Network** (globally distributed)
- Ultra-low latency, but limited compute resources
- Use when: Need ultra-fast global performance

### 6. **RSC vs Client Components** (`/rsc-vs-client`)
- Side-by-side comparison of Server Components vs Client Components
- Shows how each fetches data and renders differently
- Educational tool for understanding React patterns

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone or download this project
cd next-rendering-demo

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the home page.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Exploring the App

1. **Home Page** (`/`): Overview of all techniques with pros/cons
2. **SSR Page** (`/ssr`): Refresh to see new server-rendered time
3. **SSG Page** (`/ssg`): Time is frozen from build time
4. **ISR Page** (`/isr`): Time updates approximately every 10 seconds
5. **CSR Page** (`/csr`): Real-time client-side updates
6. **Edge Page** (`/edge`): Rendered on global edge network
7. **Comparison** (`/rsc-vs-client`): Direct comparison of two patterns

## Key Observations

- **SSR vs SSG**: Refresh SSR and SSG pages to see the difference in data freshness
- **ISR vs SSR**: ISR combines caching with periodic updates
- **CSR Real-time**: CSR page shows live clock that updates every second
- **Server vs Client**: Comparison page shows why React Server Components matter

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **API**: World Time API (free, no auth required)
- **Deployment**: Ready for Vercel

## Learning Resources

- [Next.js Rendering Docs](https://nextjs.org/docs/app/building-your-application/rendering)
- [React Server Components](https://react.dev/reference/react/use-server)
- [ISR Explanation](https://nextjs.org/docs/app/building-your-application/rendering/incremental-static-regeneration)

## Project Structure

\`\`\`
app/
├── page.tsx                    # Home page with overview
├── ssr/
│   └── page.tsx               # Server-Side Rendering example
├── ssg/
│   └── page.tsx               # Static Site Generation example
├── isr/
│   └── page.tsx               # Incremental Static Regeneration
├── csr/
│   └── page.tsx               # Client-Side Rendering
├── edge/
│   └── page.tsx               # Edge Runtime example
├── rsc-vs-client/
│   └── page.tsx               # Server vs Client comparison
├── globals.css                # Global styles
└── layout.tsx                 # Root layout

components/
├── server-time-display.tsx    # Server Component example
└── client-time-display.tsx    # Client Component example
\`\`\`

## Customization

### Change Revalidation Interval for ISR

Edit `app/isr/page.tsx`:

\`\`\`tsx
export const revalidate = 10 // Change from 10 to any seconds value
\`\`\`

### Use Different APIs

Replace the API URLs in any page. Examples:
- Cryptocurrency prices: `https://api.coindesk.com/v1/bpi/currentprice.json`
- Weather: `https://wttr.in/?format=j1`
- Random user: `https://randomuser.me/api/`

### Customize Styling

All pages use Tailwind CSS with shadcn/ui components. Edit `app/globals.css` for global changes.

## Common Questions

**Q: Why is SSG page time frozen?**
A: SSG renders at build time. The HTML is pre-built and cached. To update data, you must rebuild.

**Q: Why is CSR slower initially?**
A: Browser must download JavaScript, run it, and fetch data. This takes time.

**Q: When should I use Edge Runtime?**
A: When you need ultra-low latency globally without needing full Node.js APIs.

**Q: What's the difference between RSC and SSR?**
A: RSC is a React pattern for Server Components. SSR is a rendering strategy. RSC is newer and recommended.

## Performance Tips

- Use **SSG** for static content (fastest)
- Use **ISR** for content that updates occasionally
- Use **CSR** only for interactive apps that need real-time updates
- Use **Edge** for global low-latency requirements
- Avoid **SSR** for high-traffic sites (use ISR instead)

## Deployment

Deploy to Vercel for the best Next.js experience:

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

All rendering strategies (including ISR and Edge) work out-of-the-box on Vercel.

## License

MIT - Feel free to use for learning and teaching!
