import { useLoad } from "@tarojs/taro";
import { useTranslation } from "react-i18next";
import Button from "../../component/Button/Button";
import i18n from "../../i18n";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const { t } = useTranslation();

  return (
    <div className='container'>
      <header>
        <h1>{t("main:Welcome")}</h1>
      </header>

      <section>
        <Button
          hansleClick={() => {
            i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
          }}
        >
          {t("main:changeLanguage")}
        </Button>
        <h2>{t("main:contentTitle")}</h2>
        <p>{t("main:content")}</p>
      </section>
      <footer>
        <p>&copy; ls</p>
      </footer>
    </div>
  );
}
