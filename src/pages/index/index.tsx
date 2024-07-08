import {Image, View} from "@tarojs/components";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import headerBg from "../../asserts/headerBg.jpg";
import GlobalFooter from "../../components/GlobalFooter";

/**
 * 主页
 */
export default () => {
  return (
    <View className="indexPage">
      <View className="at-article__h1 title">MBTI性格测试</View>
      <View className="at-article__h2 subtitle">
        只需两分钟，就能非常准确的描述出你的性格特点
      </View>

      {/* eslint-disable-next-line react/jsx-no-undef */}
      <AtButton
        className="enterBtn"
        type="primary"
        circle
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/doQuestion/index",
          });
        }}
      >
        开始测试
      </AtButton>


      <View className="headerBg">
        <Image src={headerBg} />
      </View>

      <GlobalFooter></GlobalFooter>
    </View>
  );
};
