from project.models import Session

def get_db():
    try:
        current_session = Session()
        yield current_session
    finally:
        current_session.close()