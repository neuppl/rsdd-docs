import SddGraph from './SddGraph'
import React, { useEffect, useRef, useState } from 'react'

import type { SddWrapper } from '../../util/sdd'
import VTreeSelect from '../VTree/VTreeSelect'
import type { VTreeType } from '../../util/vtree'
import { TINY_CNF_2 as DEFAULT_CNF } from '../../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function SDD(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType, setVTreeType] = useState<VTreeType>('RightLinear')
  const [cnf, setCnf] = useState('')

  const wasmRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    require('@site/static/rsdd').then((wasm) => {
      wasmRef.current = wasm
      console.log(wasmRef.current)
      setLoaded(true)
    });
  }, [])

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const sddGenerator = (): JSX.Element => {
          if (!loaded || wasmRef.current === null) return <></>

          // TODO: fix this
          require('@site/static/rsdd') // for some reason, removing this breaks the build.


          const wasm = wasmRef.current;


          return <SddGraph sdd={wasm.sdd(cnf, vtreeType) as SddWrapper} />
        }
        return <section>
          <textarea
            rows={4}
            className="w-full border p-2 rounded mt-2"
            value={textarea}
            onChange={(e) => {
              setTextarea(e.target.value)
            }}
          />
          <button
            className="btn btn-blue mr-2"
            onClick={() => {
              setCnf(textarea)
            }}
          >
            load cnf
          </button>
          <VTreeSelect
            setVTreeType={(vtree) => {
              if (vtree !== vtreeType) setVTreeType(vtree)
            }}
          />
          {cnf.trim() !== '' && <WrappedRsddOutput generator={sddGenerator} />}
        </section>;
      }}
    </BrowserOnly>
  )
}
