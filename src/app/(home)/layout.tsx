import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen grid grid-flow-row grid-rows-layout'>
      <Navigation />
      <main className='w-full h-full max-w-[1440px] mx-auto'>{children}</main>
      <Footer />
    </div>
  )
}
