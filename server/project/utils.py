from passlib.context import CryptContext

PwdContext = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash(password: str):
    return PwdContext.hash(password)


def verify(plain_password, hashed_password):
    hsh = PwdContext.hash(plain_password)
    return PwdContext.verify(plain_password, hashed_password)