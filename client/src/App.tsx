import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Direction } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { stringToFelt } from "./utils";
import { feltToString } from "./utils/starknet";

function App() {
    const {
        setup: {
            systemCalls: { register_player, set_profilepic, set_full_lineup },
            clientComponents: { Player, Lineup },
        },
        account,
    } = useDojo();

    const nameInputRef = useRef<HTMLInputElement>(null);
    const [nameInputValue, setNameInputValue] = useState('');
    const handleNameInputChange = (e: any) => {
        setNameInputValue(e.target.value);
    };

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([
        BigInt(account?.account.address),
    ]) as Entity;

    const player = useComponentValue(Player, entityId);

    console.log(account?.account.address)
    console.log(entityId)
    console.log(player)

    return (
        <>
            <button className="px-4 py-2 border border-black rounded-md"
                onClick={() => account?.create()}>
                {account?.isDeploying ? "deploying burner" : "create burner"}
            </button>

            <div className="card">
                <div>{`burners deployed: ${account.count}`}</div>
                <div>
                    select signer:{" "}
                    <select
                        value={account ? account.account.address : ""}
                        onChange={(e) => account.select(e.target.value)}
                    >
                        {account?.list().map((account, index) => {
                            return (
                                <option value={account.address} key={index}>
                                    {account.address}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={() => account.clear()}>
                        Clear burners
                    </button>
                    <p>
                        You will need to Authorise the contracts before you can
                        use a burner. See readme.
                    </p>
                </div>
            </div>

            <div>

                <div className="flex flex-nowrap justify-center gap-1">
                    <span>Name: </span>
                    <span>{feltToString(String(player?.name??"")) ?? ""}</span>
                    <span>Profile Pic: </span>
                    <span>{player?.profile_pic ?? ""}</span>
                </div>
                <input type="text" name="Name"
                    maxLength={31}
                    value={nameInputValue}
                    onChange={handleNameInputChange}
                    ref={nameInputRef}
                />
                <button className="px-4 py-2 border border-black rounded-md"
                    onClick={async () => register_player(account.account,
                        nameInputValue, 1)}
                    >
                    Register Player
                </button>


            </div>
            



        </>
    );
}

export default App;
