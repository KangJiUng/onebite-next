## 섹션 7: 서버 액션

- 서버 액션(server action): 브라우저에서 호출할 수 있는 서버에서 실행되는 비동기 함수
    - 클라이언트에서 서버 코드를 별도의 API 없이 직접 호출하기 위해 사용
    - 다음 코드를 보면 form 태그에 action이라는 props로 설정해둔 saveName이라는 함수가 실행이 되는데, 이 saveName 함수 안에 이렇게 useServer라는 지시자가 붙어 있으면 이 함수는 이제 Next.js 서버에서만 실행이 되는 서버액션으로 설정이 됨
        - 다음과 같이 서버 액션을 만들게 되면 자동으로 이러한 코드를 실행하는 API가 하나 자동으로 생성이 됨 → 그 API는 브라우저에서 이러한 폼 태그를 제출했을 때 자동으로 호출이 됨
        
        <img width="400" height="250" alt="image" src="https://github.com/user-attachments/assets/8442329b-fdde-4afc-b65d-7c9e78079186" />

        

- `revalidatePath`
    - 해당 함수가 호출 되면 next 서버가 자동으로 인수로 전달한 경로에 해당하는 페이지를 재검증, 즉 재생성함
    - 리뷰 등록 시 등록된 리뷰를 바로바로 보여주는 것과 같은 상황에 사용
    - 주의사항
        1. 서버 액션 내부 또는 서버 컴포넌트 내부에서만 호출할 수 있음
        2. 경로에 해당하는 페이지를 전부 재검증시키는 기능이기 때문에 컴포넌트에 캐시 옵션을 설정해둬도 데이터 캐시가 무효화, 즉 삭제됨 뿐만 아니라 풀라우트 캐시도 함께 삭제
            1. 리밸리데이트 요청 이후에 브라우저에서 페이지에 접속하게 되었을 때 무조건 최신의 데이터를 보장하기 위해서 이런 식으로 동작함

- 다양한 재검증 방식
    1. 특정 주소에 해당하는 페이지만 재검증
    
    ```tsx
    revalidatePath(`/book/${bookId}`);
    ```
    
    1. 특정 주소에 해당하는 페이지만 재검증
    
    ```tsx
    revalidatePath("/book/[id]", "page");
    ```
    
    1. 특정 레이아웃을 갖는 모든 페이지 재검증
    
    ```tsx
    revalidatePath("/폴더이름", "layout");
    ```
    
    1. 모든 데이터 재검증
    
    ```tsx
    revalidatePath("/", "layout");
    ```
    
    1. 태그 기준으로 데이터 캐시 재검증
        1. fetch()에서 `{next: { tags: [`review-${bookId}`}}` 옵션을  사용했을 시
    
    ```tsx
    updatePath(`review-${bookId}`);
    ```
    

- useActionState
    - 폼 제출 상태(로딩 중 여부 등)를 관리하고 중복 제출을 방지하기 위해 권장되는 React 훅
        - form 태그의 상태를 쉽게 핸들링할 수 있도록 도와줌
    
    ```tsx
    "use client";
    
    import style from "./review-editor.module.css";
    import { createReviewAction } from "@/actions/create-review.action";
    import { useActionState, useEffect } from "react";
    
    export default function ReviewEditor({ bookId }: { bookId: string }) {
      const [state, formAction, isPending] = useActionState(
        createReviewAction,
        null
      );
    
      useEffect(() => {
        if (state && !state.status) {
          alert(state.error);
        }
      }, [state]);
    
      return (
        <section>
          <form className={style.form_container} action={formAction}>
            <input name="bookId" value={bookId} hidden readOnly />
            <div>
              <textarea
                disabled={isPending}
                required
                name="content"
                placeholder="리뷰 내용"
              />
            </div>
            <div className={style.submit_container}>
              <input
                disabled={isPending}
                required
                name="author"
                placeholder="작성자"
              />
              <button disabled={isPending} type="submit">
                {isPending ? "..." : "작성하기"}
              </button>
            </div>
          </form>
        </section>
      );
    }
    
    ```
    

- requestSubmit()
    - Submit() 메서드는 유효성 검사나 이벤트 핸들러 등을 다 무시하고 강제로 폼의 제출을 발생시킴
    - 반면, requestSubmit() 메서드는 실제로 사용자가 Submit 버튼을 클릭한 것과 같이 동작하지 때문에 비교적 안전하게 동작할 가능성이 높음 → 이 메서드를 사용하는 것을 권장
