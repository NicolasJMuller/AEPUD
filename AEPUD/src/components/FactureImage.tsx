interface CarreImageProps {
  image: string
  description: string
}

function CarreImage({ image, description }: CarreImageProps) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-xl border border-slate-300 bg-white">
      <img
        src={image}
        alt={description}
        className="h-full w-full object-contain"
      />
    </div>
  )
}

export default CarreImage