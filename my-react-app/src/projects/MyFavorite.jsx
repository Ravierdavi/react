import { useState } from "react"

function MyFavorite() {
    const [game, setGame] = useState({game: "Minecraft", what: "Mob", perso: "Creeper"})
    function handleChange(game, what, perso) {
        setGame({game: game, what: what, perso: perso})
    }

    return (
    <>
        <h3>My Favorite</h3>

        <label>
            Game: <input type="text" value={game.game} 
                  onChange={(e) => handleChange(e.target.value, game.what, game.perso)}/>
        </label>

        <label>
            What: <input type="text" value={game.what} 
                  onChange={(e) => handleChange(game.game, e.target.value, game.perso)}/>
        </label>

        <label>
            Perso: <input type="text" value={game.perso} 
                   onChange={(e) => handleChange(game.game, game.what, e.target.value)}/>
        </label>

        <div>
            <p>My favorite <strong>{game.what}</strong> in <strong>{game.game}</strong> is <strong>{game.perso}</strong></p>
        </div>
    </>
    )
}

export default MyFavorite