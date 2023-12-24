export default function Page({ params }: { params: { slug: string } }) {
  return <div className='p-4'>Categoria: {params.slug}</div>
}
