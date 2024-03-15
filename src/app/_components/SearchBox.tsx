import { Fragment, ReactNode, useEffect, useRef, SetStateAction, Dispatch } from "react"
import '../_assets/scss/components/search_box.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBox({ style, searchText, setSearchText }:
    { style: object | {}, searchText: string, setSearchText: Dispatch<SetStateAction<string>> }): ReactNode {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.onsubmit = (event: any) => event.preventDefault();
        }
    }, [formRef])

    return (
        <Fragment>
            <form style={style} ref={formRef} className="search-box box-shadow-1 rounded-1">
                <div style={{ display: "flex", alignItems: 'center', paddingLeft: '1rem' }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '14px', color: '#666666' }} />
                    <input className="form-control"
                        style={{ padding: 1 + 'rem', width: '100%', border: 'none' }}
                        type="text" name="search" id="search"
                        placeholder="Search"
                        value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>
                <button className="btn" style={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '-5px 0 5px rgba(0,0,0,0.02)'
                }}>
                    <FontAwesomeIcon icon={faAngleDown} />{" "}Messages
                </button>
            </form>
        </Fragment>
    )
}

export default SearchBox
