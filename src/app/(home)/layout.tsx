import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className='h-screen-minus-footer flex flex-col pt-[129px] md:pt-[73px] w-full max-w-[1440px] mx-auto'>
        {children}
      </main>
      <Footer />
    </>
  )
}
