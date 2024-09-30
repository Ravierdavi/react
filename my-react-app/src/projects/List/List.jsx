import { useState, useEffect } from "react"

function List() {
    // Armazena as listas
    const [lists, setLists] = useState([])
    // Armazena e organiza os elementos de acordo com a sua respectiva lista
    const [elements, setElements] = useState({})
    // Estado dos inputs
    const [inpListValue, setInpListValue] = useState("")
    const [inpElementValue, setInpElementValue] = useState("")
    // Qual lista está selecionada no momento
    const [selectedList, setSelectedList] = useState(lists[0])

    // ---> Funções
    useEffect(() => {
        // Quando houver uma alteração na lista, verifica se a lista selecionada foi excluída
        if(!lists.includes(selectedList)) {
            setSelectedList(lists[0] ? lists[0] : "")
        }
    }, [lists, selectedList])

    function addNewList() {
        // Verifica se alguma lista possue o mesmo nome. Se não, adiciona uma nova lista
        if (!lists.includes(inpListValue)) {
            setLists((l) => [...l, inpListValue])
            setElements((e) => ({ ...e, [inpListValue]: [] }))
            setInpListValue("")
        }
    }

    function removeList(listName) {
        setLists((prevArray) => prevArray.filter((str) => str !== listName))
        setElements((e) => ({...e, [listName]: []}))
        console.log(elements)
    }

    function addNewElement() {
        // Verifica se algum elemento possue o mesmo nome. Se não, adiciona uma novo elemento
        if (!elements[selectedList].includes(inpElementValue) && inpElementValue) {
            setElements((e) => ({ ...e, [selectedList]: [...e[selectedList], inpElementValue] }))
            setInpElementValue("")
        }
    }

    function removeElement(elementName) {
        setElements((e) => ({ ...e, [selectedList]: e[selectedList].filter((str) => str !== elementName) }))
    }

    return (
        <>
            <h1 className="title">My List</h1>

            <section className="listsContainer">
                {
                    lists.map((listName, index) => (
                        <div key={index} onClick={() => setSelectedList(listName)}>
                            <h2>
                                {listName}
                                <button onClick={() => removeList(listName)}>Remove list</button>
                            </h2>
                            <ol>
                                {
                                    elements[listName].map((elementName, index) => (
                                        <li key={index} onClick={() => removeElement(elementName)}>{elementName}</li>
                                    ))
                                }
                            </ol>
                        </div>
                    ))
                }
            </section>

            <section className="addElementContainer">
                <h3>Add element to <b>{selectedList}</b></h3>
                <input type="text" value={inpElementValue} onChange={(event) => setInpElementValue(event.target.value)} placeholder="type your element name" />
                <button onClick={addNewElement}>Add</button>
            </section>

            <section className="addListContainer">
                <input className="inputNewList" type="text" value={inpListValue} onChange={(event) => setInpListValue(event.target.value)} placeholder="type your list name" />
                <button className="btnNewList" onClick={addNewList}>New List</button>
            </section>
        </>
    )
}

export default List