import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleApi from "../../api/ArticleApi";
import { IArticle } from "../../api/viewModel/Article/IArticle";
import FormatHelper from "../../helpers/FormatHelper";
import "./home.scss";

export function Home() {
  let params = useParams<{ id: string }>();
  let [arrs, setArrs] = useState<IArticle[]>([]);

  useEffect(() => {
    let getData = async () => {
      const result = await ArticleApi.findAll();
      setArrs(result.Data);
    };
    getData();
    return () => setArrs([]);
  }, []);

  const abstract = (content: string) => {
    if (!content) {
      return;
    }
    content = content.replace(/<[^>]+>/g, "");
    return content.substring(0, 250);
  };

  return (
    <div className="skin-codinglife has-navbar">
      <div id="home">
        <div id="main">
          <div id="mainContent">
            <div className="forFlow">
              {arrs.map((item, index) => {
                return (
                  <div
                    key={index.toString()}
                    className="day"
                    role="article"
                    aria-describedby="postlist_description_11168708"
                  >
                    <div className="dayTitle">
                      <div>
                        {FormatHelper.formatTimestamp(item.createTime!)}
                      </div>
                    </div>

                    <div className="postTitle">
                      <a
                        href={"http://www.inlife.ink/detail?id=" + item.id}
                        className="postTitle2 vertical-middle pinned-post"
                      >
                        <span>{item.title}</span>
                      </a>
                    </div>
                    <div className="postCon">
                      <div
                        className="c_b_p_desc"
                        id="postlist_description_11168708"
                      >
                        摘要：{abstract(item.content)}
                        <a
                          href={"http://www.inlife.ink/detail?id=" + item.id}
                          className="c_b_p_desc_readmore"
                        >
                          阅读全文
                        </a>
                      </div>
                    </div>
                    <div className="clear"></div>
                    <div className="postDesc">
                      <span data-post-id="11168708" className="post-view-count">
                        阅读({item.pageView})
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>
                );
              })}
              <div className="topicListFooter">
                <div id="nav_next_page"></div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
        <div className="clear"></div>
        <div id="footer">
          Copyright © 2022 panle
          <br />
          <span id="poweredby">Powered by NEST.JS on NUXT3</span>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1 className="test">home1 </h1>
  //     <div>{params.id}</div>
  //     {arrs.map((item, index) => {
  //       return (
  //         <div key={index}>
  //           <img src={item.Pic180} alt="" />
  //           <div>{item.Pic180}</div>;
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}
