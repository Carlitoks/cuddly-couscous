import React from "react";
import Svg, {Path, G, Defs, ClipPath, Rect} from "react-native-svg";

const Translator = ({width, height, viewBox}) => {
  return (
    <Svg width={width || "23"} height={height || "23"} viewBox={viewBox || "0 0 23 23"} fill="none">
      <G clip-path="url(#clip0)">
        <Path d="M22.9821 10.952C22.9775 10.0355 22.2318 9.28988 21.3109 9.28988L15.6598 9.30339L15.6418 3.18945C15.6374 2.27312 14.8916 1.52734 13.9753 1.52734L8.7552 1.54086L5.86687 1.5498C5.74105 1.5498 5.6198 1.59929 5.52995 1.68913C5.44011 1.77898 5.39062 1.90023 5.39062 2.02605C5.39062 2.28645 5.60629 2.49773 5.86687 2.49773L8.7552 2.4886L13.9707 2.47527C14.3661 2.47527 14.6849 2.79411 14.6849 3.18945L14.703 9.84684C14.703 10.04 14.631 10.2197 14.4963 10.3545C14.3615 10.4893 14.1818 10.5656 13.9886 10.5656L7.27734 10.5881C7.13802 10.5881 7.00781 10.6465 6.91797 10.7542L5.39062 12.5243L3.6657 10.7409C3.57585 10.6465 3.45004 10.5926 3.32422 10.597L1.68913 10.6016C1.50032 10.6016 1.32063 10.5296 1.18587 10.3949C1.0511 10.2601 0.97477 10.0804 0.97477 9.88737L0.952309 3.22981C0.952309 3.03679 1.02425 2.8571 1.15902 2.72234C1.29379 2.58757 1.47347 2.51106 1.66667 2.51106H2.29102C2.5516 2.51106 2.76726 2.29558 2.7627 2.035C2.7627 1.90918 2.71321 1.78793 2.61898 1.69808C2.52914 1.60824 2.40788 1.55875 2.28207 1.56332H1.66211C1.21745 1.56332 0.799644 1.73844 0.485191 2.05289C0.170738 2.37191 0 2.78972 0 3.23438L0.0178986 9.89176C0.0178986 10.3366 0.193199 10.7542 0.512039 11.0687C0.826492 11.3787 1.2443 11.5539 1.68457 11.5539H1.69352L3.12663 11.5495L5.07161 13.5618C5.16145 13.6517 5.28727 13.7057 5.41309 13.7057H5.4266C5.56136 13.7012 5.68718 13.6427 5.77246 13.5394L7.49739 11.536L9.24496 11.5314L9.24934 17.6453C9.24934 18.09 9.42464 18.5078 9.7391 18.8223C10.0536 19.1367 10.4714 19.3075 10.916 19.3075L15.534 19.2939L17.2725 21.2884C17.3577 21.3874 17.4881 21.4502 17.6183 21.4502H17.6273C17.7577 21.4502 17.8835 21.3963 17.9688 21.3019L19.905 19.2804L21.3379 19.276C21.7825 19.276 22.2004 19.1007 22.5148 18.7863C22.8293 18.4718 23 18.0496 23 17.6048L22.9821 10.952ZM22.0477 17.6139C22.0477 17.807 21.9757 17.9866 21.841 18.1214C21.7062 18.2562 21.5265 18.3327 21.3333 18.3327L19.6982 18.3371C19.568 18.3371 19.4466 18.3909 19.3568 18.4854L17.6408 20.2777L16.0999 18.5124C16.0101 18.409 15.8799 18.3506 15.7451 18.3506H15.7406L10.916 18.3595C10.7274 18.3595 10.5477 18.2878 10.4129 18.153C10.2782 18.0182 10.2018 17.8385 10.2018 17.6497L10.1973 11.5314L14.0021 11.5225C14.7703 11.5225 15.4307 11.0013 15.6149 10.2601L21.32 10.2422C21.7152 10.2422 22.0342 10.5612 22.0342 10.9564L22.0477 17.6139Z" fill="black"/>
        <Path d="M3.96201 2.50224L3.97096 2.50681C4.01589 2.52032 4.06081 2.52471 4.10573 2.52471C4.31244 2.52471 4.50108 2.38555 4.55951 2.18779C4.63584 1.93633 4.49213 1.67119 4.2405 1.59486L4.23155 1.5903C3.98009 1.51396 3.71494 1.65768 3.63861 1.90931C3.57123 2.16094 3.71056 2.42591 3.96201 2.50224Z" fill="black"/>
        <Path d="M6.45528 9.34379C6.67551 9.34379 6.80571 9.26746 6.85063 9.11462L7.09314 8.22074H8.59802L8.8407 9.11462C8.88106 9.26746 9.01583 9.34379 9.23605 9.34379C9.41118 9.34379 9.57735 9.2943 9.73914 9.20007C9.90532 9.10567 9.98621 8.98441 9.98621 8.85421C9.98621 8.83614 9.98165 8.80929 9.9727 8.76875L8.60715 4.3171C8.56661 4.19128 8.47238 4.09249 8.32849 4.02055C8.18934 3.95316 8.02316 3.92175 7.83891 3.92175C7.65466 3.92175 7.49305 3.95773 7.34933 4.02055C7.20544 4.08793 7.11121 4.18672 7.07068 4.3171L5.71407 8.77332C5.70512 8.81368 5.70056 8.8407 5.70056 8.8586C5.70056 8.99336 5.78602 9.11023 5.94763 9.20446C6.10942 9.2943 6.28016 9.34379 6.45528 9.34379ZM7.33582 7.29984L7.83891 5.4491L8.342 7.29984H7.33582Z" fill="black"/>
        <Path d="M17.5598 13.746C17.569 13.6608 17.5419 13.5842 17.4881 13.5169C17.3982 13.4181 17.2321 13.3552 17.0432 13.3552C16.8502 13.3552 16.7288 13.4361 16.6749 13.6067C16.3875 13.6067 16.118 13.6337 15.8619 13.6876C15.8663 13.5439 15.8709 13.4451 15.8798 13.3328C15.9112 13.3328 15.9427 13.3282 15.9786 13.3282C16.055 13.3238 16.1448 13.3193 16.2617 13.3103C16.374 13.3014 16.5087 13.2879 16.657 13.2698C16.8186 13.2519 16.9894 13.234 17.1466 13.2249C17.7351 13.1666 17.9238 13.0452 17.9238 12.7174C17.9238 12.4612 17.7711 12.2861 17.5555 12.2861C17.5149 12.2861 17.47 12.2861 17.3758 12.304L17.2949 12.3175C16.7604 12.3984 16.5133 12.4387 15.9562 12.4747C15.9742 12.331 15.9876 12.1917 15.9876 12.1064C15.9876 11.8728 15.8349 11.7424 15.5564 11.7424C15.2014 11.747 15.0983 11.8997 15.0442 12.5107H14.8466C14.7793 12.5107 14.6805 12.5107 14.5861 12.5061C14.4918 12.5061 14.3974 12.5017 14.3346 12.5017C14.0335 12.5017 13.9122 12.6184 13.9122 12.9239C13.9122 13.3777 14.1728 13.3777 14.6984 13.3777C14.7928 13.3777 14.8961 13.3777 14.9993 13.3688V13.3867C14.9903 13.5888 14.9814 13.7774 14.9768 13.9885C14.1144 14.4244 13.6383 15.0847 13.6383 15.8528C13.6383 16.5312 13.9931 16.9176 14.6175 16.9176C14.8512 16.9176 15.0442 16.8727 15.2959 16.7647C15.3722 16.886 15.4576 16.9309 15.6103 16.9309C15.9202 16.9309 16.1494 16.7512 16.1494 16.5177C16.1494 16.4413 16.1315 16.3515 16.0909 16.2346C16.5133 15.8484 16.9534 15.2195 17.277 14.5457C17.5598 14.6715 17.7171 14.923 17.7171 15.2555C17.7171 15.8888 17.1871 16.0999 16.8367 16.2392L16.8278 16.2438C16.6389 16.3155 16.5402 16.4592 16.5402 16.657C16.5402 16.922 16.7558 17.1422 17.0164 17.1422C17.3623 17.1422 18.6425 16.666 18.6425 15.242C18.6515 14.5097 18.2517 13.9661 17.5598 13.746ZM16.4099 14.4063C16.3112 14.649 16.1044 14.9859 15.8977 15.242C15.8798 15.0623 15.8528 14.7119 15.8528 14.5143C16.0371 14.4602 16.2168 14.4244 16.4099 14.4063ZM14.9993 14.95C15.0174 15.2734 15.0488 15.5968 15.0983 15.9068C14.9275 16.0011 14.7882 16.046 14.6848 16.046C14.5682 16.046 14.4918 15.9426 14.4918 15.79C14.4918 15.4217 14.7208 15.197 14.9993 14.95Z" fill="black"/>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="23" height="23" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Translator;
