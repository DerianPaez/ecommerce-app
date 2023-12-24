import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col'>
      <Navigation />
      <main className='h-full w-full max-w-[1440px] mx-auto'>{children}</main>
      <Footer />
    </div>
  )
}
