interface FactureImageProps {
  image: string
}

function FactureImage({ image }: FactureImageProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border-[6px] border-[#4525F5] bg-white sm:border-[8px]"
      style={{ aspectRatio: '210 / 297' }}
    >
      {image !== '' ? (
        <img
          src={image}
          alt="Aperçu de la facture"
          className="block h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <p className="text-center text-lg font-bold text-[#4525F5]">
            Ajoute une image de ta facture
          </p>
        </div>
      )}
    </div>
  )
}

export default FactureImage