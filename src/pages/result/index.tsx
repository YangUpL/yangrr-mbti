import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import headerBg from "../../asserts/headerBg.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";
import questionResult from "../../data/question_result.json";
import {getBestQuestionResult} from "../../utils/bizUtils";

/**
 * 结果页面
 */
export default () => {

  const answerList = Taro.getStorageSync("answerList");

  if(!answerList || answerList.length == 0){
    Taro.showToast({
      title: '结果集错误',
      icon: 'error',
      duration: 3000
    })
  }

  const result = getBestQuestionResult(answerList,questions,questionResult);
  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h2 subtitle">{result.resultDesc}</View>

      {/* eslint-disable-next-line react/jsx-no-undef */}
      <AtButton
        className="enterBtn"
        type="primary"
        circle
        onClick={() => {
          //关掉之前的页面  返回主页
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>

      <Image className="headerBg" src={headerBg} />

      <GlobalFooter></GlobalFooter>
    </View>
  );
};
