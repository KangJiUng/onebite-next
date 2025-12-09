## 섹션 3: App Router 시작하기

- App Router: Next.js 13 버전에 새롭게 추가된 라우터, 기존의 Page Router를 완전히 대체함
    - 변경되거나 추가되는 사항
        - 데이터 페칭 방식 변경
        - 레이아웃 설정 방식 변경
        - 페이지 라우팅 설정 방식 변경
        - React 18 신규 기능 추가
            - React Server Component
            - Streaming
            - …
    - 크게 변경되지 않는 사항
        - 네비게이팅
        - 프리페칭
        - 사전렌더링
        - …
        
- App Router에서는 Page Router와 다르게 page라는 이름을 갖는 파일만 page파일로 취급됨
<img width="350" height="350" alt="image" src="https://github.com/user-attachments/assets/63bdf840-c3df-425a-ad7e-bc1ad47e0e55" />
<img width="350" height="350" alt="image" src="https://github.com/user-attachments/assets/1c3a625a-ea3c-4101-9717-023634cfd8cc" />


- 쿼리 스트링, URL 파라미터 값 사용하기
    - Next App에서는 쿼리 스트링이나 URL 파라미터와 같은 경로상에 포함되는 값들은 모두 페이지 컴포넌트들에게 props로써 전달됨
    - Promise로부터 꺼내써야함
    - 클라이언트 컴포넌트에서 URL의 쿼리 스트링 값을 가져오기 위해선 useSearchParams() 훅을 사용
        
        ```tsx
        // 쿼리 스트링
        export default async function Page({
          searchParams,
        }: {
          searchParams: Promise<{ q: string }>;
        }) {
          const { q } = await searchParams;
          return <div>Search 페이지: {q}</div>;
        }
        
        // URL 파라미터
        export default async function Page({
          params,
        }: {
          params: Promise<{ id: string }>;
        }) {
          const { id } = await params;
          return <div>book/[id] 페이지: {id}</div>;
        }
        ```
        

- 특정 폴더에 `layout.tsx` 파일을 생성했을 때, 해당 레이아웃이 적용되는 범위는 해당 폴더와 그 하위 폴더의 모든 페이지에 적용
    - 레이아웃 컴포넌트 리턴문 안에 페이지 컴포넌트를 어디에 배치할 건지 직접 설정해줘야함
    
    ```tsx
    export default function Layout({ children }: { children: React.ReactNode }) {
      return (
        <div>
          <div>임시서치바</div>
          {children}
        </div>
      );
    }
    ```
    

- RouteGroup: 경로상에 아무런 영향을 미치지 않는 폴더
    - `(폴더명)` 의 방식으로 폴더 이름에 ( )를 사용
    - 각각 다른 경로를 갖는 여러 페이지 파일들을 하나의 폴더 안에 묶어둘 수 있는 기능

- React Server Component
    - React 18v부터 새롭게 추가된 컴포넌트로, 서버 측에서만 실행되는 컴포넌트
        - 기본적으로 서버 컴포넌트로 설정되어있음
    - 사전 렌더링을 진행하는 과정에서 한 번 실행이 된 후 JS Bundle에는 포함되지 않음 → JS Bundle에 상호작용이 필요없는 컴포넌트까지 포함하면서 생기는 단점을 해결
        - 이 외의 리액트 컴포넌트는 Client Component로 명명, 사전 렌더링과 Hydration을 위해 두 번 실행됨
    - 보안에 민감한 작업이나 데이터를 페칭하는 등의 기능을 수행, 반대로 브라우저에서만 할 수 있는 일들은 수행할 수 없음
        - useState나 useEffect 같은 React 훅 직접 사용 불가
        
- React Client Component
    - 상호작용이 있는 컴포넌트 → 이벤트 핸들러를 통해 programmetic하게 작동하는 컴포넌트
    - 파일의 상단에 `"use client"` 지시자를 추가하면 임의로 클라이언트 컴포넌트로 설정 가능

- React Server Component 주의 사항
    1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다.
        1. React Server Component는 브라우저 측에서 동작하는 리액트 훅스, 이벤트 핸들러뿐만 아니라 브라우저 측에서 실행되는 기능을 담고있는 라이브러리 역시 사용 불가
        2. 라이브러리 코드로 인해서도 오류가 발생할 수 있기 때문에 신경써서 사용
    2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.
        1. 사전 렌더링 때, 하이드레이션 때 둘 다 실행되므로 사전 렌더링 때 서버 측 콘솔에서도 한 번 실행 됨
    3. 클라이언트 컴포넌트는 서버 컴포넌트를 import 할 수 없다.
        1. `"use client"` 지시자가 작성되어 있는 클라이언트 컴포넌트에서 서버 컴포넌트를 임포트해서 사용 불가 → 오류가 발생하거나 의도치 않은 동작이 발생 가능
            1. 이 역시 서버 컴포넌트는 하이드레이션 때는 실행되지 않는 특징 때문
        2. 클라이언트 컴포넌트 안에서 서버 컴포넌트의 서버 실행 특성을 유지하면서 포함시키려면 **서버 컴포넌트를 클라이언트 컴포넌트의 `children` prop으로 전달해야함**
    4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 Props는 전달 불가하다.
        1. 직렬화(Serialization): 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는 것 ⇒ 함수는 직렬화가 불가능
            
            <img width="978" height="326" alt="image" src="https://github.com/user-attachments/assets/930ca2f1-cbcd-4744-bd13-d056c0db42bb" />

            
        2. 사전 렌더링 과정에서 서버 컴포넌트만 따로 한 번 실행을 시키는 과정이 추가로 존재 → RSC 페이로드 생성 → HTML 페이지 생성
            1. RSC 페이로드(React Server Component Payload): RSC의 순수한 데이터(결과물), 즉 직렬화한 결과로 서버 컴포넌트의 모든 데이터가 포함됨
                
                <img width="1218" height="390" alt="image" src="https://github.com/user-attachments/assets/aafee77f-9f46-4633-b194-c122305f427c" />

                <img width="1168" height="218" alt="image" src="https://github.com/user-attachments/assets/fe1809c3-d906-47a4-b50a-53e1c087bd80" />

                

- App Router 버전의 네비게이팅 방식은 Page Router와 거의 같은 방식으로 페이지 이동을 처리
    - 작지만 중요한 차이점: 페이지 이동이나 프리페칭 시 서버가 브라우저에게 JS Bundle 뿐만 아니라 RSC 페이로드도 함께 전달
        
        → JS Bundle에는 클라이언트 컴포넌트만 포함되기 때문에 서버 컴포넌트로 구성된 부분도 브라우저에게 함께 보내주기 위한 것
        
        → 브라우저는 JS Bundle을 실행해서 RSC 페이로드와 합쳐서 페이지를 적절히 교체하게 됨
        
    - 서버컴포넌트일 경우 RSC 페이로드만 전달됨
