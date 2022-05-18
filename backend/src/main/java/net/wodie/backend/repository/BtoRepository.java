package net.wodie.backend.repository;

import net.wodie.backend.dto.BtoDisplayItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BtoRepository extends MongoRepository<BtoDisplayItem, String> {

}


