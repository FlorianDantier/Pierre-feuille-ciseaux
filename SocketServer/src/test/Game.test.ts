// import reqGame from '../class/handleDataBase/reqGame'
// import connectionDB from '../connectDB'
// import Game from "../class/handleDataBase/Game";
// import exp from "constants";
//
//
// test('Result fetch line number 1 in table game', async () => {
//     const DB = await connectionDB()
//     const testGame = new reqGame(DB)
//     const result = await testGame.all(-1, -1);
//     expect(result.length).toBe(1);
//     expect(result[0]).toEqual(new Game(result[0]))
// })
//
// test('Result insert line in table Game', async () => {
//     const DB = await connectionDB()
//     DB.run("DELETE FROM Game WHERE idManche = -2")
//     const TestGame = new reqGame(DB)
//     const LineToAdd = new Game({
//         user1: "TestAddLine",
//         user2: "TestAddLine",
//         user1Choice: "TestAddLine",
//         user2Choice: "TestAddLine",
//         idManche: -2,
//         idGame: -2
//     })
//     TestGame.addLine(LineToAdd)
//     const result = await TestGame.all(-2, -2)
//
//     expect(result).toEqual([LineToAdd])
// })
//
