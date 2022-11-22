package tn.iit.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.iit.bank.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {
	
	public List<Client> findByNameStartingWith(String prefix);

}
