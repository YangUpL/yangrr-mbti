import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
// eslint-disable-next-line import/first
import { AtButton, AtRadio } from "taro-ui";
// eslint-disable-next-line import/first
import { useEffect, useState } from "react";
import questions from "../../data/questions.json"

/**
 * 做题页面
 */
export default () => {
  //当前题目序号  useState是react提供的  current当先
  //setCurrent是一个函数  类似于set方法   默认(初始为1)
  const [current, setCurrent] = useState<number>(1);

  //当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  //当前题目的options
  const questionOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}  ${option.value}`,

      // 这个value就是点击选项时的value
      value: option.key,
    };
  });

  //当前答案
  const [currentAnswer, setCurrentAnswer] = useState<string>();

  //答案列表
  const [answerList] = useState<string[]>([]);

  //当序号(current) 变化时自动执行useEffect 执行setCurrentQuestion更改当前题目  setCurrentAnswer更改当前答案
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);  //让下一题答案归null
    /**
     * current = 1：第一题
     * 第一题的答案为A -> currentAnswer为A answerList[0] = A
     * 切换页面！！ current = 2
     * 第二题的答案为为answerList[1]为null  重新选择执行下面选项的onclick
     */
  }, [current]);

  return (

    <View className="doQuestionPage">
      {JSON.stringify(answerList)}
      {/*拿到列表中的title*/}
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}
      </View>

      <View className="option_wrapper">
        {/*拿到列表中的options*/}
        <AtRadio
          options={
            questionOptions
            // { label: '单选项一', value: 'option1', desc: '单选项描述' }  原始按钮
          }

          //绑定value 和 currentAnswer(起初啥也没有)
          //当用户点击时  从questionOptions中取出value  进行setCurrentAnswer  answerList[current - 1]
          //切换题目时执行useEffect
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            answerList[current - 1] = value;
          }}
        />
      </View>

      {current < questions.length && (
        // setCurrent让  页码 + 1
        <AtButton
          className="controlBtn"
          type="primary"
          circle
          disabled={!currentAnswer}  //currentAnswer不为null才能点
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}

      {current == questions.length && (
        <AtButton
          className="controlBtn"
          type="primary"
          circle
          disabled={!currentAnswer}  //currentAnswer不为null才能点
          onClick={() => {

            //将answerList存入Storage  方便result页面获得
            Taro.setStorageSync("answerList",answerList);
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}

      {
        /*primary是高亮*/
        current > 1 && (
          <AtButton
            className="controlBtn"
            circle
            onClick={() => setCurrent(current - 1)}
          >
            上一题
          </AtButton>
        )
      }

      <GlobalFooter></GlobalFooter>
    </View>
  );
};
