import SddGraph from '../Sdd/SddGraph'
import React, { useEffect, useRef, useState } from 'react'

import type { SddWrapper } from '../../util/sdd'
import { TINY_CNF_2 as DEFAULT_CNF } from '../../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'
import VTreeGraph from '../VTree/VTreeGraph'
import type { VTree } from '../../util/vtree'
import BrowserOnly from '@docusaurus/BrowserOnly'


export default function ModelCountSDD(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
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
          let res = wasm.demo_model_count_sdd(cnf);

          return <>
            <h3 className='mt-2'>model count: {res.model_count}</h3>
            <p>(SDD to the left; VTree to the right, decided with minfill-DTree heuristic)</p>
            <div className='grid grid-cols-2 gap-2'>
              <SddGraph sdd={res.sdd as SddWrapper} />
              <VTreeGraph vtree={res.vtree.root as VTree} />
            </div>
          </>
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
            <div>
              <button
                className="button button--primary"
                onClick={() => {
                  setCnf(textarea)
                }}
              >
                compile CNF
              </button>
            </div>
          </div>
          {cnf.trim() !== '' && <WrappedRsddOutput generator={sddGenerator} />}
        </section>;
        }}
    </BrowserOnly>
  )
}
