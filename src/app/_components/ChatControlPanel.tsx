import { Fragment, ReactNode, useState } from "react";
import '../_assets/scss/components/chatControl.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";

function ChatControlPanel({ style }: { style: object | undefined }): ReactNode {
    const [search, setSearch] = useState<string>("");

    return (
        <Fragment>
            <div className="chat-control-panel" style={style ?? {}}>
                <div className="chat-control-panel__head">
                    <div className="">
                        <h1>Chat</h1>
                        <button className="btn" style={{ padding: '0' }}>
                            Recent chat <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                    <div className="">
                        <button className="btn bg-primary-gradient rounded-1 box-shadow-1">
                            <FontAwesomeIcon icon={faPlus} />{" "}Create New Chat
                        </button>
                    </div>
                </div>
                <SearchBox style={{margin: '2rem 0'}} searchText={search} setSearchText={setSearch}/>
            </div>
        </Fragment>
    )
}

export default ChatControlPanel;
