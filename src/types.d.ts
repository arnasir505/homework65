export interface ApiPage {
  title: string;
  content: string;
}

export interface Page extends ApiPage {
  [id: string]: string;
}

export interface ApiPages {
  [id: string]: ApiPage;
}
