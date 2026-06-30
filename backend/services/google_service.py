from sqlalchemy.orm import Session

from models.google_account import GoogleAccount


def save_google_account(
    db: Session,
    email: str,
    access_token: str,
    refresh_token: str,
    expiry,
):

    account = db.query(GoogleAccount).filter(
        GoogleAccount.email == email
    ).first()

    if account:

        account.access_token = access_token
        account.refresh_token = refresh_token
        account.expiry = expiry

    else:

        account = GoogleAccount(
            email=email,
            access_token=access_token,
            refresh_token=refresh_token,
            expiry=expiry,
        )

        db.add(account)

    db.commit()

    return account
