import ensios from '../documents/Ensios webbanalys.docx';
import arbetsFormedlingen from '../documents/Arbetsförmedlingen.docx';
import krav from '../documents/Krav.xlsx';
import stories from '../documents/Stories.docx';
import schoolVideo from "../videos/Untitled.mp4"

let experience = {
    
    webDevelopment:{
      name:"webDevelopment",
      projects:{
        webCv:{
          name: "web CV",
          background:"webbcv.jpg",
          links: {
            gitHub:{
              name:"gitHub",
              address: "https://github.com/albertito1985/cv",
              type: "git"
            }
          },
        },
        schoolApp:{
          name: "schoolApp",
          background:"schoolApp.jpg",
          links: {
            gitHub:{
              name:"pages code in GitHub",
              address: "https://github.com/albertito1985/SchoolApp",
              type: "git"
            },
            video:{
              name:"video about the page.",
              address: schoolVideo,
              type: "video"
            }
          },
        }
      },
    },
    design:{
      name:"design", // UX/UI in practice
      projects:{
        ensios:{
          name: "Ensios",
          background:"Ensios.jpg",
          links: {
            documentation:{
              name:"Documentation",
              address: ensios,
              type: "word"
            },
            prototype:{
              name:"Prototype",
              address: "https://www.figma.com/file/so2BmYdGXLY1qDrriHXSkj/Ensio's?node-id=30%3A1339",
              type: "link"
            }
          },
        },
        qrawler:{
          name: "qrawler",
          background:"qrawler.jpg",
          links: {
            prototype:{
              name:"Prototype",
              address: "https://www.figma.com/file/WkwwgpnXqJYn2GNrVrAlLh/Gr%C3%A4nssnitt-0.1-(Copy)?node-id=0%3A1",
              type: "link"
            },
            requirements:{
              name:"Requirements",
              address: krav,
              type: "excell"
            },
            stories:{
              name:"User stories",
              address: stories,
              type: "word"
            }
          }
        }
      },
    },
    javaScript:{
      name:"javaScript",
      projects:{
        // pairWords:{
        //   name: "pairWords",
        //   links: {
        //     page:{
        //       name:"page",
        //       address: "./documents/matcha/Matcha.html",
        //       type: "link"
        //     }
        //   },
        // }
      },
    },
    research:{
      name:"research",
      projects:{
        thesis:{
          name: "bachellorsThesis",
          background:"ex2300px.png",
          links: {
            documentation:{
              name:"thesis",
              address: "http://liu.diva-portal.org/smash/record.jsf?dswid=1681&pid=diva2%3A1417210&c=2&searchType=SIMPLE&language=sv&query=&af=%5B%5D&aq=%5B%5B%7B%22freeText%22%3A%22alberto+Nu%C3%B1ez%22%7D%5D%5D&aq2=%5B%5B%5D%5D&aqe=%5B%5D&noOfRows=50&sortOrder=author_sort_asc&sortOrder2=title_sort_asc&onlyFullText=false&sf=all",
              type: "link"
            }
          },
        },
        arbetsformedlingen:{
          name: "arbetsformedlingen",
          background:"AF.jpg",
          links: {
            documentation:{
              name:"thesisLink",
              address: arbetsFormedlingen,
              type: "word"
            }
          },
        }
      },
    }
}

export default experience;