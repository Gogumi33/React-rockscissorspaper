import { useState } from 'react';
import './App.css';
import Box from './component/Box';

// 가위바위보 프로젝트 로드맵
// 1. 웹에 보이는 큰 박스 2개
// 2. 박스 밑에 가위/바위/보 버튼이 있음
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 두 번째 박스에는 랜덤으로 세 가지중 선택을 해야 함.
// 5. 3번, 4번의 결과로 승 패를 가려야 함.
// 6. 테두리 - 지면 빨강, 이기면 초록, 비기면 검정

const choice = {
  rock:{
    name: "Rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqhaCOMDz6U4U9wKvMh_ET26IoVoIhojw0Q&usqp=CAU",
  },
  scissors:{
    name: "Scissors",
    img: "data:image/jpeg;base64,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"
  },
  paper:{
    name: "Paper",
    img: "data:image/jpeg;base64,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"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null); // state에 있는 값이 변할 때 마다 UI 변하게 하기 위함.
  const [computerSelect, setComputerSelect] = useState(null);
  
  const [result, setResult] = useState(""); // 결과는 비어있는 String타입 넣어놓기.
  let [comResult, setComResult] = useState("");

  const play = (userChoice) => {
    // userSelect = choice[userChoice]; // state는 변수와 다르기 때문에 변수 할당처럼 이렇게 하면 안 바뀜.
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);

    let userResult = judgement(choice[userChoice], computerChoice);
    setResult(userResult); // 두 결과값 판단하는 함수.
    // console.log(userResult, "^0^");

    // comResult 판단
    if( userResult === "tie" ){
      comResult = "tie";
      alert("Draw!");
    }
    else if( userResult === "win" ){
      comResult = "lose";
      alert("You Win!!!");
    }
    else if( userResult === "lose" ){
      comResult = "win";
      alert("You lose...");
    }
    setComResult(comResult);
  };
  const judgement = (user, computer) => { // 가위바위보 로직
    // console.log("user", user, "computer", computer);
    // user == computer -> tie
    // 이후 총 6(2*3)개 케이스 명시하기.

    if(user.name === computer.name){
      return "tie";
    }else if(user.name === "Rock") return computer.name === "Scissors" ? "win" : "lose";
    else if(user.name === "Scissors") return computer.name === "Paper" ? "win" : "lose";
    else if(user.name === "Paper") return computer.name === "Rock" ? "win" : "lose";
  }

  const randomChoice = () => {
    // 객체의 키 값만 뽑아서 배열로 넣어주는 함수.
    let itemArray = Object.keys(choice); // @@ 위 맨 처음 choice객체를 배열화.
    let randomItem = Math.floor(Math.random()*itemArray.length); // 0~1사이 모든 소수
    let final = itemArray[randomItem];
    return choice[final]; // 위 computerChoice 안으로 랜덤 객체정보가 쏙 들어감.
  }

  return (
    <div class="container">
      <div className="main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={comResult}/>
      </div>
      <div>
        <h1>Your Choice!!!</h1>
      </div>
      <div className="buttons">
        <button onClick={() => play("rock")}><img src="image/rock.png" class="imgs" alt=""/></button>
        <button onClick={() => play("scissors")}><img src="image/scissors.png" class="imgs" alt=""/></button>
        <button onClick={() => play("paper")}><img src="image/paper.png" class="imgs" alt=""/></button>
      </div>
    </div>
  );
}

export default App;
