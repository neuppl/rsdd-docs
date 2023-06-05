import SddGraph from '../Sdd/SddGraph'
import React, { useEffect, useRef, useState } from 'react'

import type { SddWrapper } from '../../util/sdd'
import VTreeSelect from '../VTree/VTreeSelect'
import type { VTreeType } from '../../util/vtree'
import { TINY_CNF_2 as DEFAULT_CNF } from '../../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function SDDRightVersusLeftLinear(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType1, setVTreeType1] = useState<VTreeType>('RightLinear')
  const [vtreeType2, setVTreeType2] = useState<VTreeType>('LeftLinear')
  const [cnf, setCnf] = useState(DEFAULT_CNF)

  const wasmRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    require('@site/static/rsdd').then((wasm) => {
      wasmRef.current = wasm
      setLoaded(true)
    });
  }, [])

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const sddGenerator = (): JSX.Element => {
          if (!loaded || wasmRef.current === null) return <></>
          const wasm = wasmRef.current;


          return <div className='grid grid-cols-2 grid-gap-2'>
            <SddGraph sdd={wasm.sdd(cnf, vtreeType1) as SddWrapper} />
            <SddGraph sdd={wasm.sdd(cnf, vtreeType2) as SddWrapper} />
          </div>
        }
        return <section>
          <div className='grid grid-cols-2 grid-gap-2'>
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={textarea}
              onChange={(e) => {
                setTextarea(e.target.value)
              }}
            />
            <ul className='px-2 list-none'>
              <li>
                <button
                  className="button button--primary"
                  onClick={() => {
                    setCnf(textarea)
                  }}
                >
                  load cnf
                </button>
              </li>
              <li>
                <VTreeSelect
                  defaultVTree='RightLinear'
                  setVTreeType={(vtree) => {
                    if (vtree !== vtreeType1) setVTreeType1(vtree)
                  }}
                /> (left SDD)
              </li>
              <li>
                <VTreeSelect
                  defaultVTree='LeftLinear'
                  setVTreeType={(vtree) => {
                    if (vtree !== vtreeType2) setVTreeType2(vtree)
                  }}
                /> (right SDD)
              </li>
            </ul>
          </div>


          {<WrappedRsddOutput generator={sddGenerator} />}
        </section>;
      }}
    </BrowserOnly>
  )
}
