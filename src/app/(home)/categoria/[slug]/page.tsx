export default function Page({ params }: { params: { slug: string } }) {
  return <div className='p-4 md:px-10 py-10'>Categoria: {params.slug}</div>
}
