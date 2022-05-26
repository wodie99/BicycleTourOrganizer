package net.wodie.backend.security.repository;

import net.wodie.backend.dto.AppUserItemDto;
import net.wodie.backend.security.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByUserName(String username);

    Optional<AppUserItemDto> findAppUserByUserName(String userName);


}
