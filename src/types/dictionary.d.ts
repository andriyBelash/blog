export interface Dictionary {
  home: string
  about: string,
  main_title: string,
  latest_articles: string,
  show_more: string,
  all_tags: string,
  auth: {
    login: string,
    enter_details: string,
    login_title: string
    email: string,
    username: string,
    password: string,
    does_not_have_account: string,
    sign_up: string,
    sign_up_title: string,
    already_have_account: string
  }

  validation: {
    required: string,
    invalid_email: string,
    min_6: string
    min_3: string
  }

  toast: {
    success: string,
    error: string,
    invalid_credentials: string
  }
}