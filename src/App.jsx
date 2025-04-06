import React, { useState } from 'react'
import { motion } from 'framer-motion'

const fakeDatabase = {
  Nutella: {
    brand: 'Ferrero',
    headquarters: {
      it: 'Alba, Italia',
      en: 'Alba, Italy',
      fr: 'Alba, Italie',
      zh: '意大利，阿尔巴'
    },
    madeIn: {
      it: 'Italia, Germania, Polonia, Canada, Australia',
      en: 'Italy, Germany, Poland, Canada, Australia',
      fr: 'Italie, Allemagne, Pologne, Canada, Australie',
      zh: '意大利、德国、波兰、加拿大、澳大利亚'
    }
  },
  iPhone: {
    brand: 'Apple',
    headquarters: {
      it: 'Cupertino, California, USA',
      en: 'Cupertino, California, USA',
      fr: 'Cupertino, Californie, États-Unis',
      zh: '美国加利福尼亚州库比蒂诺'
    },
    madeIn: {
      it: 'Cina',
      en: 'China',
      fr: 'Chine',
      zh: '中国'
    }
  }
}

const labels = {
  it: {
    title: 'Origine Prodotto by Nick',
    placeholder: 'Scrivi una marca o un prodotto...',
    search: 'Cerca',
    brand: 'Marca',
    headquarters: 'Sede principale',
    madeIn: 'Luogo di produzione'
  },
  en: {
    title: 'Product Origin by Nick',
    placeholder: 'Enter a brand or product...',
    search: 'Search',
    brand: 'Brand',
    headquarters: 'Headquarters',
    madeIn: 'Manufactured in'
  },
  fr: {
    title: 'Origine du Produit par Nick',
    placeholder: 'Entrez une marque ou un produit...',
    search: 'Rechercher',
    brand: 'Marque',
    headquarters: 'Siège social',
    madeIn: 'Lieu de fabrication'
  },
  zh: {
    title: '产品来源 - Nick',
    placeholder: '输入品牌或产品...',
    search: '搜索',
    brand: '品牌',
    headquarters: '总部',
    madeIn: '生产地'
  }
}

export default function App() {
  const [input, setInput] = useState('')
  const [lang, setLang] = useState('it')
  const [result, setResult] = useState(null)

  const t = labels[lang]

  const handleSearch = () => {
    const key = Object.keys(fakeDatabase).find(
      (k) => k.toLowerCase() === input.toLowerCase()
    )
    if (key) {
      setResult(fakeDatabase[key])
    } else {
      setResult({
        brand: input,
        headquarters: { [lang]: 'Informazione non trovata' },
        madeIn: { [lang]: 'Prodotto non riconosciuto' }
      })
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">{t.title}</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-md text-base w-full"
        />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="it">🇮🇹</option>
          <option value="en">🇬🇧</option>
          <option value="fr">🇫🇷</option>
          <option value="zh">🇨🇳</option>
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {t.search}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white shadow rounded-lg p-4 mt-4 space-y-2">
            <p>
              <strong>{t.brand}:</strong> {result.brand}
            </p>
            <p>
              <strong>{t.headquarters}:</strong> {result.headquarters[lang]}
            </p>
            <p>
              <strong>{t.madeIn}:</strong> {result.madeIn[lang]}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
