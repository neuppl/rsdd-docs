import SddGraph from '../Sdd/SddGraph'
import React, { useEffect, useRef, useState } from 'react'

import type { SddWrapper } from '../../util/sdd'
import VTreeSelect from '../VTree/VTreeSelect'
import type { VTreeType } from '../../util/vtree'
import { TINY_CNF_2 as DEFAULT_CNF } from '../../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'
import BrowserOnly from '@docusaurus/BrowserOnly'

const vtreeString = (vtreeType: VTreeType) => {
  if (typeof(vtreeType) === 'string') return vtreeType
  return `Even Split, n=${vtreeType["EvenSplit"]}`
}

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

          const sdd1 = wasm.sdd(cnf, vtreeType1) as SddWrapper;
          const sdd2 = wasm.sdd(cnf, vtreeType2) as SddWrapper;


          return <div className='grid grid-cols-2 gap-2 my-2'>
            <div className='border border-solid rounded p-2'>
              <p><b>{vtreeString(vtreeType1)} vtree</b>; {sdd1.nodes.length} OR nodes, {sdd1.nodes.map(and => and.length).reduce((a, b ) => a + b, 0)} AND nodes</p>
              <SddGraph sdd={sdd1} />
            </div>
            <div className='border border-solid rounded p-2'>
              <p><b>{vtreeString(vtreeType2)} vtree</b>; {sdd2.nodes.length} OR nodes, {sdd2.nodes.map(and => and.length).reduce((a, b ) => a + b, 0)} AND nodes</p>
              <SddGraph sdd={sdd2} />
            </div>
          </div>
        }
        return <section>
          <div className='grid grid-cols-2 gap-2'>
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={textarea}
              onChange={(e) => {
                setTextarea(e.target.value)
              }}
            />
            <ul className='px-2 list-none'>
              <li className='my-1'>
                <button
                  className="button button--primary"
                  onClick={() => {
                    setCnf(textarea)
                  }}
                >
                  load cnf
                </button>
              </li>
              <li className='my-1'>
                <VTreeSelect
                  defaultVTree='RightLinear'
                  setVTreeType={(vtree) => {
                    if (vtree !== vtreeType1) setVTreeType1(vtree)
                  }}
                /> (left SDD)
              </li>
              <li className='my-1'>
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
