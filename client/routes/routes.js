import TopicList from "../views/TopicList";
import TopicDetail from "../views/TopicDetail";
import TestApi from "../views/TestApi";

const routes = [
  {
    path: "/list",
    component: TopicList
  },
  {
    path: "/detail",
    component: TopicDetail
  },
  {
    path: "/testApi",
    component: TestApi
  }
];

export default routes;
