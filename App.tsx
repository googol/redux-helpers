import React from 'react'
import { connect } from 'react-redux'
import { createStateMapper, useSelector, useDispatch } from './reduxHelpers'
import * as foo from './fooReducer'
import * as bar from './barReducer'
import { preventingDefault, withTargetValue } from './eventHelpers'

const EditCounter = () => {
    const count = useSelector(bar.getEditCounter)
    const dispatch = useDispatch()

    return (
        <>
            <p>Current edit count is: {count}</p>
            <button onClick={ preventingDefault(() => dispatch(bar.resetEditCounter())) }>Reset counter</button>
        </>
    )
}

const mapStateToProps = createStateMapper({
    text: foo.getText,
    length: foo.getLength,
    snippet: foo.getSnippet,
})
const mapDispatchToProps = {
    setText: foo.setText,
    setLength: foo.setLength,
}

type PropTypes = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Snippet = connect(mapStateToProps, mapDispatchToProps)(({ text, length, snippet, setText, setLength }: PropTypes) => (
    <div>
        <textarea value={text} onChange={withTargetValue((text) => setText({ text }))}/>
        <input type="number" value={length === undefined ? '' : length} onChange={withTargetValue((value) => {
            const num = Number(value)
            if (value === '' || Number.isNaN(num)) {
                setLength(undefined)
            } else {
                setLength(num)
            }
        })} />
        <h2>Snippet:</h2>
        <p>{ snippet }</p>
    </div>
))

export const App = () => (
  <>
    <Snippet />
    <EditCounter />
  </>
)
