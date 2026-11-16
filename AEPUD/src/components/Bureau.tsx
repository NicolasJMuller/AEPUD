const membres = [
  { prenom: 'Clara', photo: 'Clara.png', fonction: 'Présidente' },
  { prenom: 'Juliette', photo: 'Juliette.png', fonction: 'Vice-présidente' },
  { prenom: 'Lucas', photo: 'Lucas.png', fonction: 'Communication' },
  { prenom: 'Robin', photo: 'Robin.png', fonction: 'Événementiel' },
  { prenom: 'Judicaël', photo: 'Judy.png', fonction: 'Trésorier' },
  { prenom: 'Romane', photo: 'Romane.png', fonction: 'Secrétaire' },
]

function Bureau() {
  return (
    <section aria-labelledby="titre-membres" className="mx-auto mb-8 w-full max-w-lg px-4 pt-6 sm:px-6">
      <h2 id="titre-membres" className="mb-4 text-3xl font-black text-[#4525F5] sm:text-4xl">Membres</h2>
      <ul className="flex flex-col gap-7 rounded-[36px] border-[10px] border-[#4525F5] bg-white px-4 py-8 sm:gap-8 sm:rounded-[44px] sm:border-[13px] sm:px-8 sm:py-9">
          {membres.map(({ prenom, photo, fonction }) => (
            <li key={prenom} className="flex min-h-28 items-center gap-3 even:flex-row-reverse even:text-right sm:gap-5">
              <img
                src={`${import.meta.env.BASE_URL}Medias/Bureaux/${photo}`}
                alt=""
                className="aspect-square w-[34%] max-w-28 shrink-0 object-contain sm:max-w-32"
              />
              <div>
                <h3 className="mb-1 text-xl leading-tight font-black uppercase text-[#F079B5] sm:text-3xl">{prenom}</h3>
                <p className="text-sm leading-tight text-[#4525F5] sm:text-base">BUT MMI</p>
                <p className="text-sm leading-tight font-black uppercase text-[#F079B5] sm:text-lg">{fonction}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default Bureau
