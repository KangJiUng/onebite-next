## 섹션 8: 고급 라우팅 패턴

- Parallel Route(병렬 라우트)
    - 하나의 화면 안에 여러 개의 페이지를 병렬로 함께 렌더링 시켜주는 패턴
        
        <img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/0e42f9ea-bca2-4ebd-bc97-63610cbbb1a3" />

        
    - Parallel Route를 만들려면 ‘슬롯’을 만들어야함 → `@sidebar` 처럼 폴더 앞에 @ 기호가 붙은 폴더를 슬롯이라고 부름
    - 슬롯은 병렬로 렌더링이 될 하나의 페이지 컴포넌트를 보관하는 폴더
    - 슬롯을 생성 한 뒤 해당 폴더 안에 페이지 컴포넌트를 만들면 부모 레이아웃 컴포넌트에게 자신이 속한 슬롯의 이름으로 props로 전달 → 기본 페이지 컴포넌트인 children과 함께 슬롯의 페이지 컴포넌트인 해당 슬롯 이름을 함께 병렬로 같이 렌더링이 가능해짐
    
    ```tsx
    import Link from "next/link";
    import { ReactNode } from "react";
    
    export default function Layout({
      children,
      sidebar,
      feed,
    }: {
      children: ReactNode;
      sidebar: ReactNode;
      feed: ReactNode;
    }) {
      return (
        <div>
          <div>
            <Link href={"parallel/setting"}>@feed/setting</Link>
          </div>
          <br />
          {sidebar}
          {feed}
          {children}
        </div>
      );
    }
    ```
    
    - 특정 슬롯 안에 폴더를 만들고 그 경로로 이동하면 해당 이름의 폴더가 없는 슬롯의 경우 그냥 이전의 페이지를 유지하도록 처리함
    - 주의사항
        - 각각의 슬롯들이 이전의 페이지를 유지하게 되는 건 오직 링크 컴포넌트를 이용해서 브라우저 측에서 클라이언트 사이드 렌더링 방식으로 페이지를 이동할 때에만 한정된 이야기
            
            → 새로고침으로 슬롯의 이전 값을 찾을 수 없는 경우를 방지하기 위해 대신 렌더링할 `default.tsx` 페이지를 생성
            

- Intercepting Route
    - 사용자가 동일한 경로에 접속하게 되더라도 특정 조건을 만족하게 되면 원래 페이지가 아닌 다른 페이지를 렌더링 하도록 설정하는 기술
        - 인터셉팅 라우트가 적용된 페이지(예: 모달)에 접근한 후 브라우저를 새로고침하면 인터셉팅 라우트가 비활성화되어 원래 경로의 페이지가 렌더링됨
    - 따로 설정하는 것은 X, 초기 접속 요청이 아닐 때에만 동작
    - `(.)인터셉팅할폴더명` 으로 폴더를 생성 페이지 컴포넌트를 구성

- 패럴랠 라우트에서 `@` 기호로 시작하는 슬롯(slot) 폴더 안의 `page.tsx`는 부모 `layout.tsx`에서 부모 레이아웃 컴포넌트의 props로 접근 가능

- 패럴랠 라우트와 인터셉팅 라우트를 함께 사용하는 일반적인 이유는 모달 형태로 상세 페이지를 띄우면서 배경 페이지를 유지하기 위해
